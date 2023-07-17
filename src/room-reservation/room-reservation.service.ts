import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { RoomReservation } from './room-reservation.entity';
import { EntityManager, Repository } from 'typeorm';
import { RoomReservationDetail } from '../room-reservation-detail/room-reservation-detail.entity';
import { Bill } from 'src/bills/bills.entity';
import { roomReservationDetailsType } from 'src/room-reservation-detail/room-reservation-detail.input';
import { getRoomReservationsInput } from './room-reservation.input';
import { BuildPagination } from 'src/core/utils/pagination.utils';
import { getRoomReservationsTypes } from './room-reservation.types';

@Injectable()
export class RoomReservationService {
    constructor(
        @InjectRepository(RoomReservation) private roomReservationRepo: Repository<RoomReservation>,
        @InjectRepository(RoomReservationDetail) private roomReservationDetailsRepo: Repository<RoomReservationDetail>,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) { }

    async createRoomReservation(input: any): Promise<RoomReservation> {
        if (input.checkIn > input.checkOut) {
            throw new BadRequestException("check in must not be greater than check out")
        }
        const currentDate = new Date();
        const { roomReservationDetails, ...filter } = input;
        const reservation = new RoomReservation(filter);
        if (input.numberOfRoom !== roomReservationDetails.length) {
            throw new BadRequestException("only can chose " + input.numberOfRoom + " room")
        }
        await this.entityManager.transaction(async (transactionEntity) => {
            const newreservation = await transactionEntity.save(reservation)
            const reservationDetails = roomReservationDetails.map((item: roomReservationDetailsType) => {
                return {
                    ...item,
                    roomReservationId: newreservation.id
                }
            })
            const newDetails = transactionEntity.getRepository(RoomReservationDetail).create(reservationDetails);
            await transactionEntity.insert(RoomReservationDetail, newDetails);
            if (input.checkIn <= currentDate && input.checkOut >= currentDate) {
                const bill = new Bill();
                bill.staffId = newreservation.staffId;
                bill.roomReservationId = newreservation.id;
                const newBill = await transactionEntity.save(bill);
                newreservation.billId = newBill.id;
                await transactionEntity.save(newreservation)
            }
        })
        return reservation;
    }

    async getRoomReservation(id: string): Promise<RoomReservation> {
        const reservation = await this.roomReservationRepo.findOneBy({ id });
        if (!reservation) {
            throw new BadRequestException("Room-Reservation not found");
        }
        return reservation;
    }

    async getRoomReservations(input: getRoomReservationsInput): Promise<getRoomReservationsTypes> {
        const query = BuildPagination(RoomReservation, input)
        const [rows, count] = await this.roomReservationRepo.findAndCount({
            ...query
        })
        console.log(rows)
        return { totalPage: Math.ceil(count / input.limit), roomReservations: rows }
    }


    async getReservationWithReservationDetails(roomReservationId: string) {
        let rooms = undefined;
        if (roomReservationId) {
            rooms = await this.roomReservationRepo.findOneBy({ id: roomReservationId })
        }
        return rooms;
    }

    async getRoomReservationDetails(roomReservationId: string) {
        let details = undefined;
        if (roomReservationId) {
            details = await this.roomReservationDetailsRepo.findBy({ roomReservationId: roomReservationId })
        }
        return details;
    }
}
