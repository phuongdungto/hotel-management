import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bills.entity';
import { EntityManager, LessThanOrEqual, Repository } from 'typeorm';
import { BillDetail } from '../bill-details/bill-detail.entity';
import { billType, getBillsType } from './bills.types';
import { getIds, minusDate } from '../core/utils/check.utils';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';
import { checkOutInput, getBillsInput, updateBillInput } from './bills.input';
import { BuildPagination } from '../core/utils/pagination.utils';
import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { Rooms } from '../rooms/rooms.entity';
import { billDetailType } from '../bill-details/bill-detail.types';
import { BillStatus, RoomStatus } from '../core/enum';
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

    async getBill(id: string): Promise<billType> {
        let bill = await this.billRepo.findOne({
            where: { id },
            relations: {
                customer: true,
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
        this.formatBill(bill as billType);
        return bill as billType
    }

    async getBills(input: getBillsInput): Promise<getBillsType> {
        const query = BuildPagination(Bill, input);
        let [rows, count] = await this.billRepo.findAndCount({
            ...query,
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
        rows.forEach((bill: billType) => {
            this.formatBill(bill)
        })
        return { totalPage: Math.ceil(count / input.limit), bills: rows as [billType] }
    }

    async createBill(reservationId: string): Promise<Bill> {
        const reservation = await this.reservationRepo.findOne({
            where: { id: reservationId },
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
        })
        return bill;
    }

    async updateBill(input: updateBillInput) {
        const bill = await this.billRepo.findOne({
            where: { id: input.id },
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
        })
        if (!bill) {
            throw new BadRequestException("bill not found.");
        }
        const { billDetails, ...inputBill } = input
        Object.assign(bill, inputBill);
        let billEntity = new Bill(bill)
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
        this.formatBill(billEntity as billType);
        return billEntity as billType;
    }

    async checkOut(id: string): Promise<billType> {
        const bill = await this.billRepo.findOne({
            where: { id },
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
        this.formatBill(bill as billType);
        return bill as billType;
    }

    async getbillWithReservation(billId: string) {
        let bill = undefined;
        if (billId) {
            bill = await this.getBill(billId);
        }
        return bill;
    }

    formatBill(bill: billType) {
        let cost = 1;
        if (minusDate(bill.roomReservation.checkOut, bill.roomReservation.checkIn) > 1) {
            cost = minusDate(bill.roomReservation.checkOut, bill.roomReservation.checkIn)
        }
        let totalRental: number = 0;
        let totalService: number = 0;
        let totalRoomPromotion: number = 0;
        let totalServicePromotion: number = 0;
        if (bill.roomReservation.roomReservationDetails.length !== 0) {
            bill.roomReservation.roomReservationDetails.forEach((item: any, index, arr) => {
                totalRental += item.room.price * cost;
                let percent = 0;
                let roomPromotion = null;
                item.room.roomPromotionDetails.forEach((item1: RoomPromotionDetails) => {
                    if (item1.dateStart <= bill.createdAt && item1.dateEnd >= bill.createdAt) {
                        totalRoomPromotion += (item1.roomPromotion.percent * item.room.price * cost) / 100;
                        percent = item1.roomPromotion.percent;
                        roomPromotion = item1.roomPromotion
                    }
                })
                if (index === arr.length - 1) {
                    delete item.room.roomPromotionDetails
                }
                item.room.percent = percent;
                item.room.roomPromotion = roomPromotion;
            })
        }
        if (bill.billDetails.length !== 0) {
            bill.billDetails.forEach((item: billDetailType, index, arr) => {
                totalService += item.service.price * item.quantity;
                let percent: number = 0;
                let servicePromotion = null;
                item.service.servicePromotionDetails.forEach((item1, index1, arr1) => {
                    if (item1.dateStart <= bill.createdAt && item1.dateEnd >= bill.createdAt) {
                        totalServicePromotion += (item1.percent * item.service.price) / 100;
                        percent = item1.percent;
                        servicePromotion = item1.servicePromotion
                    }
                })
                if (index === arr.length - 1) {
                    delete item.service.servicePromotionDetails
                }
                item.service.percent = percent;
                item.service.servicePromotion = servicePromotion;
            })
        }
        bill.totalRental = totalRental;
        bill.totalService = totalService;
        bill.totalRoomPromotion = totalRoomPromotion;
        bill.totalServicePromotion = totalServicePromotion;
    }
}
