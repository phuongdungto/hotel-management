import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bills.entity';
import { EntityManager, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { BillDetail } from '../bill-details/bill-detail.entity';
import { billType, getBillsType } from './bills.types';
import { getIds, minusDate } from '../core/utils/check.utils';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';
import { checkOutInput, createBillInput, getBillsInput, updateBillInput } from './bills.input';
import { BuildPagination } from '../core/utils/pagination.utils';
import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { Rooms } from '../rooms/rooms.entity';
import { billDetailType } from '../bill-details/bill-detail.types';
import { ActionUpdateBill, BillStatus, RoomStatus } from '../core/enum';
import { RoomReservationDetail } from '../room-reservation-detail/room-reservation-detail.entity';

@Injectable()
export class BillsService {
    constructor(
        @InjectRepository(Bill) private billRepo: Repository<Bill>,
        @InjectRepository(BillDetail) private billDetailRepo: Repository<BillDetail>,
        @InjectRepository(RoomReservation) private reservationRepo: Repository<RoomReservation>,
        @InjectRepository(Rooms) private roomRepo: Repository<Rooms>,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) { }

    async getBill(id: string): Promise<Bill> {
        let bill = await this.billRepo.findOne({
            where: { id },
        });
        if (!bill) {
            throw new BadRequestException("Bill not found")
        }
        // await this.formatBill(bill as billType);
        return bill
    }

    async getBills(input: getBillsInput): Promise<getBillsType> {
        const query = BuildPagination(Bill, input);
        let [rows, count] = await this.billRepo.findAndCount({
            ...query
        });
        return { totalPage: Math.ceil(count / input.limit), bills: rows }
    }

    async createBill(input: createBillInput): Promise<Bill> {
        const reservation = await this.reservationRepo.findOne({
            where: { id: input.roomReservationId },
            relations: {
                roomReservationDetails: {
                    room: true
                }
            }
        })
        const roomIds = getIds(reservation.roomReservationDetails, 'roomId')
        const bill = new Bill();
        await this.entityManager.transaction(async (transactionEntity) => {
            await transactionEntity.update(Rooms, roomIds, { status: 'occupied' })
            bill.staffId = reservation.staffId;
            bill.customerId = reservation.customerId;
            bill.roomReservationId = reservation.id;
            const newbill = await transactionEntity.save(Bill, bill);
            reservation.billId = newbill.id;
            await transactionEntity.save(RoomReservation, reservation);
            if (input.billDetails && input.billDetails.length > 0) {
                const details = input.billDetails.map((item) => {
                    return {
                        ...item,
                        billId: newbill.id
                    }
                });
                console.log(details);
                const newDetails = transactionEntity.getRepository(BillDetail).create(details);
                await transactionEntity.insert(BillDetail, newDetails);
            }
        })
        return await this.watchAndUpdateBill(bill.id, ActionUpdateBill.BILL);
    }

    async updateBill(input: updateBillInput): Promise<Bill> {
        const bill = await this.billRepo.findOne({
            where: { id: input.id },
            relations: {
                billDetails: {
                    service: {
                        servicePromotionDetails: true
                    }
                },
            }
        })
        if (!bill) {
            throw new BadRequestException("bill not found.");
        }
        const { billDetails, ...inputBill } = input
        Object.assign(bill, inputBill);
        const billEntity = new Bill(bill)
        await this.entityManager.transaction(async (transactionEntity) => {
            await transactionEntity.save(billEntity);
            if (billDetails.length > 0) {
                await transactionEntity.delete(BillDetail, { billId: billEntity.id });
                const details = billDetails.map((item: BillDetail) => {
                    return {
                        ...item,
                        billId: billEntity.id
                    }
                })
                const newDetails = transactionEntity.getRepository(BillDetail).create(details);
                await transactionEntity.insert(BillDetail, newDetails);
            }
        })
        return await this.watchAndUpdateBill(bill.id, ActionUpdateBill.BILL);
    }

    async checkOut(id: string): Promise<Bill> {
        const bill = await this.billRepo.findOne({
            where: { id },
            relations: {
                roomReservation: {
                    roomReservationDetails: true
                }
            }
        });
        if (!bill) {
            throw new BadRequestException("Bill not found");
        }
        if (bill.status === BillStatus.PAID) {
            throw new BadRequestException("Bill is paid");
        }
        bill.status = BillStatus.PAID;
        let roomIds = []
        bill.roomReservation.roomReservationDetails.map((item: RoomReservationDetail) => {
            roomIds.push(item.roomId);
        })
        await this.entityManager.transaction(async (transactionEntity) => {
            await transactionEntity.update(Rooms, roomIds, { status: RoomStatus.CLEARING })
            const newBill = await transactionEntity.save(bill);
            await transactionEntity.update(RoomReservation, bill.roomReservationId, { status: BillStatus.PAID })
        })
        return bill;
    }

    async watchAndUpdateBill(billId: string, action: string): Promise<Bill> {
        let bill = new Bill();
        if (action === ActionUpdateBill.BOTH) {
            bill = await this.billRepo.findOne({
                where: { id: billId },
                relations: {
                    billDetails: {
                        service: {
                            servicePromotionDetails: true
                        }
                    },
                    roomReservation: {
                        roomReservationDetails: {
                            room: {
                                roomPromotionDetails: {
                                    roomPromotion: true
                                }
                            }
                        }
                    }
                }
            });
        }
        if (action === ActionUpdateBill.BILL) {
            bill = await this.billRepo.findOne({
                where: { id: billId },
                relations: {
                    customer: true,
                    billDetails: {
                        service: {
                            servicePromotionDetails: true
                        }
                    }
                }
            });
        }
        if (action === ActionUpdateBill.RESERVATION) {
            bill = await this.billRepo.findOne({
                where: { id: billId },
                relations: {
                    customer: true,
                    roomReservation: {
                        roomReservationDetails: {
                            room: {
                                roomPromotionDetails: {
                                    roomPromotion: true
                                }
                            }
                        }
                    }
                }
            });
        }
        const newBill = await this.formatBill(bill, action);
        return newBill;
    }

    async formatBill(bill: Bill, action: string) {
        let totalRental: number = 0;
        let totalService: number = 0;
        let totalRoomPromotion: number = 0;
        let totalServicePromotion: number = 0;
        if (action === ActionUpdateBill.BOTH || action === ActionUpdateBill.RESERVATION) {
            if (bill.roomReservation.roomReservationDetails && bill.roomReservation.roomReservationDetails.length !== 0) {
                let cost = 1;
                if (minusDate(bill.roomReservation.checkOut, bill.roomReservation.checkIn) > 1) {
                    cost = minusDate(bill.roomReservation.checkOut, bill.roomReservation.checkIn)
                }
                bill.roomReservation.roomReservationDetails.forEach((item: any, index, arr) => {
                    totalRental += item.room.price * cost;
                    item.room.roomPromotionDetails.forEach((item1: RoomPromotionDetails) => {
                        if (item1.dateStart <= bill.createdAt && item1.dateEnd >= bill.createdAt) {
                            totalRoomPromotion += (item1.roomPromotion.percent * item.room.price * cost) / 100;
                        }
                    })
                    // if (index === arr.length - 1) {
                    //     delete item.room.roomPromotionDetails
                    // }
                })
                bill.totalRental = totalRental;
                bill.totalRoomPromotion = totalRoomPromotion;
            }
        }

        if (action === ActionUpdateBill.BOTH || action === ActionUpdateBill.BILL) {
            if (bill.billDetails && bill.billDetails.length !== 0) {
                bill.billDetails.forEach((item: BillDetail) => {
                    totalService += item.service.price * item.quantity;
                    let percent: number = 0;
                    item.service.servicePromotionDetails.forEach((item1) => {
                        if (item1.dateStart <= bill.createdAt && item1.dateEnd >= bill.createdAt) {
                            totalServicePromotion += (item1.percent * item.service.price * item.quantity) / 100;
                            percent = item1.percent;
                        }
                    })
                    // if (index === arr.length - 1) {
                    //     delete item.service.servicePromotionDetails
                    // }
                })
                bill.totalService = totalService;
                bill.totalServicePromotion = totalServicePromotion;
            }
        }
        return await this.billRepo.save(bill);
    }

    async getbillWithReservation(billId: string) {
        let bill = undefined;
        if (billId) {
            bill = await this.getBill(billId);
        }
        return bill;
    }

    async getbillDetailsWithBill(billId: string) {
        let details = undefined;
        if (billId) {
            details = await this.billDetailRepo.findBy({ billId });
        }
        return details;
    }
}
