import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { RoomReservation } from './room-reservation.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { RoomReservationDetail } from '../room-reservation-detail/room-reservation-detail.entity';
import { Bill } from '../bills/bills.entity';
import { roomReservationDetailsType } from '../room-reservation-detail/room-reservation-detail.input';
import { getRoomReservationsInput, updateRoomReservationInput } from './room-reservation.input';
import { BuildPagination } from '../core/utils/pagination.utils';
import { getRoomReservationsTypes } from './room-reservation.types';
import { Rooms } from '../rooms/rooms.entity';
import { getIds, minusDate } from '../core/utils/check.utils';
import { BillStatus } from 'src/core/enum';
import { BillDetail } from 'src/bill-details/bill-detail.entity';

@Injectable()
export class RoomReservationService {
    constructor(
        @InjectRepository(RoomReservation) private roomReservationRepo: Repository<RoomReservation>,
        @InjectRepository(RoomReservationDetail) private roomReservationDetailsRepo: Repository<RoomReservationDetail>,
        @InjectRepository(Rooms) private roomRepo: Repository<Rooms>,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) { }

    async createRoomReservation(input: any): Promise<RoomReservation> {
        if (input.checkIn > input.checkOut) {
            throw new BadRequestException("check in must not be greater than check out")
        }
        const currentDate = new Date();
        if (minusDate(currentDate, input.checkIn) > 0) {
            throw new BadRequestException("check in must not be less than current date")
        }
        if (minusDate(input.checkIn, currentDate) > 2) {
            throw new BadRequestException("Booking can only be made up to 2 days in advance")
        }
        const { roomReservationDetails, ...filter } = input;
        const reservation = new RoomReservation(filter);
        if (input.numberOfRoom !== roomReservationDetails.length) {
            throw new BadRequestException("only can chose " + input.numberOfRoom + " room")
        }
        await this.entityManager.transaction(async (transactionEntity) => {
            const roomIds = getIds(roomReservationDetails, 'roomId');
            const rooms = await transactionEntity.createQueryBuilder()
                .select()
                .from(Rooms, 'rooms')
                .where('rooms.id IN (:...roomIds) AND (rooms.status = :status1 OR rooms.status = :status2)', { roomIds, status1: 'occupied', status2: 'reserved' })
                .getRawMany()
            if (rooms.length !== 0) {
                throw new BadRequestException("Rooms not available")
            }
            const newreservation = await transactionEntity.save(reservation)
            const reservationDetails = roomReservationDetails.map((item: roomReservationDetailsType) => {
                return {
                    ...item,
                    roomReservationId: newreservation.id
                }
            })
            const newDetails = transactionEntity.getRepository(RoomReservationDetail).create(reservationDetails);
            await transactionEntity.insert(RoomReservationDetail, newDetails);
            if (minusDate(input.checkIn, currentDate) <= 0) {
                const bill = new Bill();
                bill.staffId = newreservation.staffId;
                bill.roomReservationId = newreservation.id;
                bill.customerId = input.customerId;
                const newBill = await transactionEntity.save(bill);
                newreservation.billId = newBill.id;
                await transactionEntity.save(newreservation);
                await transactionEntity.createQueryBuilder()
                    .update(Rooms)
                    .set({ status: 'occupied' })
                    .where({ id: In(roomIds) })
                    .execute()
            }
            if (minusDate(input.checkIn, currentDate) > 0) {
                await transactionEntity.createQueryBuilder()
                    .update(Rooms)
                    .set({ status: 'reserved' })
                    .where({ id: In(roomIds) })
                    .execute()
            }
        })
        return reservation;
    }

    async updateRoomReservation(input: updateRoomReservationInput): Promise<RoomReservation> {
        if (input.checkIn > input.checkOut) {
            throw new BadRequestException("check in must not be greater than check out")
        }
        const currentDate = new Date();
        if (input.checkIn) {
            if (minusDate(currentDate, input.checkIn) > 0) {
                throw new BadRequestException("check in must not be less than current date")
            }
            if (minusDate(input.checkIn, currentDate) > 2) {
                throw new BadRequestException("Booking can only be made up to 2 days in advance")
            }
        }
        const reservation = await this.roomReservationRepo.findOneBy({ id: input.id });
        if (minusDate(input.checkOut, reservation.checkIn) < 0) {
            throw new BadRequestException("check in must not be greater than check out")
        }
        if (!reservation) {
            throw new BadRequestException("Room-Reservation not found")
        }
        if (input.roomReservationDetails && input.numberOfRoom !== input.roomReservationDetails.length) {
            throw new BadRequestException("only can chose " + input.numberOfRoom + " room")
        }
        const { roomReservationDetails, ...filter } = input;
        let roomIds = null;
        await this.entityManager.transaction(async (transactionEntity) => {
            Object.assign(reservation, filter);
            const newreservation = await transactionEntity.save(reservation)
            let check = false;
            if (roomReservationDetails) {
                roomIds = getIds(roomReservationDetails, 'roomId')
                const roomOld = await transactionEntity.findBy(RoomReservationDetail,
                    { roomReservationId: reservation.id }
                )
                const roomOldIds = getIds(roomOld, 'roomId');
                await transactionEntity.createQueryBuilder()
                    .update(Rooms)
                    .set({ status: 'available' })
                    .where({ id: In(roomOldIds) })
                    .execute()
                const rooms = await transactionEntity.createQueryBuilder()
                    .select()
                    .from(Rooms, 'rooms')
                    .where('rooms.id IN (:...roomIds) AND (rooms.status = :status1 OR rooms.status = :status2)', { roomIds, status1: 'occupied', status2: 'reserved' })
                    .getRawMany()

                if (rooms.length !== 0) {
                    throw new BadRequestException("Rooms not available")
                }
                const reservationDetails = roomReservationDetails.map((item: roomReservationDetailsType) => {
                    return {
                        ...item,
                        roomReservationId: newreservation.id
                    }
                })

                await transactionEntity.delete(RoomReservationDetail, {
                    roomReservationId: newreservation.id
                })
                const newDetails = transactionEntity.getRepository(RoomReservationDetail).create(reservationDetails);
                await transactionEntity.insert(RoomReservationDetail, newDetails);

                check = true;
            }
            if (newreservation && minusDate(newreservation.checkIn, currentDate) <= 0) {
                const exists = await transactionEntity.findOneBy(Bill, { roomReservationId: reservation.id })
                if (!exists) {
                    const bill = new Bill();
                    bill.staffId = newreservation.staffId;
                    bill.customerId = input.customerId;
                    if (input.customerId) {
                        bill.roomReservationId = newreservation.id;
                    }
                    const newBill = await transactionEntity.save(bill);
                    newreservation.billId = newBill.id;
                    await transactionEntity.save(newreservation);
                }
                if (check) {
                    await transactionEntity.createQueryBuilder()
                        .update(Rooms)
                        .set({ status: 'occupied' })
                        .where({ id: In(roomIds) })
                        .execute()
                }
            }
            if (newreservation && minusDate(newreservation.checkIn, currentDate) > 0 && check) {
                await transactionEntity.createQueryBuilder()
                    .update(Rooms)
                    .set({ status: 'reserved' })
                    .where({ id: In(roomIds) })
                    .execute()
            }
        })
        return reservation;
    }

    async deleteRoomReservation(id: string) {
        const reservation = await this.roomReservationRepo.findOneBy({ id });
        if (!reservation) {
            throw new BadRequestException("Room-Reservation not found");
        }
        await this.entityManager.transaction(async (transactionEntity) => {
            if (reservation.status === BillStatus.UNPAID) {
                if (reservation.roomReservationDetails) {
                    const roomIds = getIds(reservation.roomReservationDetails, 'roomId')
                    await transactionEntity.createQueryBuilder()
                        .update(Rooms)
                        .set({ status: 'available' })
                        .where({ id: In(roomIds) })
                        .execute()
                }
                await transactionEntity.delete(RoomReservationDetail, {
                    roomReservationId: reservation.id
                })
                await transactionEntity.delete(BillDetail, {
                    billId: reservation.billId
                })
                await transactionEntity.delete(RoomReservation, reservation.id)
            }
            if (reservation.status === BillStatus.PAID) {
                await transactionEntity.softDelete(RoomReservation, reservation.id)
                await transactionEntity.softDelete(BillDetail, reservation.billId)
            }
        })
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
