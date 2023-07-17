import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { RoomPromotion } from './room-promotion.entity';
import { EntityManager, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { createRoomPromotionInput, getRoomPromotionsInput, updateRoomPromotionInput } from './room-promotion.input';
import { getRoomPromotionsType } from './room-promotion.types';
import { BuildPagination } from '../core/utils/pagination.utils';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';

@Injectable()
export class RoomPromotionService {
    constructor(
        @InjectRepository(RoomPromotion) private roomPromotionRepo: Repository<RoomPromotion>,
        @InjectRepository(RoomPromotionDetails) private roomPromotionDetailRepo: Repository<RoomPromotionDetails>,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) { }

    async createRoomPromotion(input: createRoomPromotionInput): Promise<RoomPromotion> {
        if (input.dateStart > input.dateEnd) {
            throw new BadRequestException("Start date must not be greater than end date")
        }
        const { roomPromotionDetails, ...filter } = input;
        const newRoomPromotion = new RoomPromotion(filter);
        await this.entityManager.transaction(async (transactionManager) => {
            const roomPromotion = await transactionManager.save(newRoomPromotion);
            if (input.roomPromotionDetails) {
                const roomPromotionDetails: Partial<RoomPromotionDetails>[] = input.roomPromotionDetails.map(item => {
                    return {
                        ...item,
                        roomPromotionId: roomPromotion.id,
                        dateStart: roomPromotion.dateStart,
                        dateEnd: roomPromotion.dateEnd
                    }
                })
                const newDetails = transactionManager.getRepository(RoomPromotionDetails).create(roomPromotionDetails);
                await transactionManager.insert(RoomPromotionDetails, newDetails);
            }
        })
        return newRoomPromotion;
    }

    async updateRoomPromotion(input: updateRoomPromotionInput): Promise<RoomPromotion> {
        const roomPromotion = await this.roomPromotionRepo.findOneBy({ id: input.id });
        if (!roomPromotion) {
            throw new NotFoundException("Room-Promotion not found");
        }
        if (input.dateStart > input.dateEnd) {
            throw new BadRequestException("Start date must not be greater than end date")
        }
        const { roomPromotionDetails, ...filter } = input
        Object.assign(roomPromotion, filter);
        const newRoomPromotion = new RoomPromotion(roomPromotion)
        await this.entityManager.transaction(async (transactionManager) => {
            const RoomPromotion = await transactionManager.save(newRoomPromotion);
            if (input.roomPromotionDetails) {
                await transactionManager.delete(RoomPromotionDetails, { roomPromotionId: RoomPromotion.id });
                const roomPromotionDetails = input.roomPromotionDetails.map(item => {
                    return {
                        ...item,
                        roomPromotionId: RoomPromotion.id
                    }
                })
                const newDetails = transactionManager.getRepository(RoomPromotionDetails).create(roomPromotionDetails);
                await transactionManager.insert(RoomPromotionDetails, newDetails);
            }
        })
        return newRoomPromotion;
    }

    async getRoomPromotion(id: string): Promise<RoomPromotion> {
        const roomPromotion = await this.roomPromotionRepo.findOneBy({ id });
        console.log(roomPromotion)
        if (!roomPromotion)
            throw new NotFoundException("Room-Promotion not found");
        return roomPromotion;
    }

    async getRoomPromotions(input: getRoomPromotionsInput): Promise<getRoomPromotionsType> {
        const query = BuildPagination(RoomPromotion, input);
        const [rows, count] = await this.roomPromotionRepo.findAndCount({
            ...query
        });
        return { totalPage: Math.ceil(count / input.limit), roomPromotions: rows }
    }

    async deleteRoomPromotion(id: string) {
        const roomPromotion = await this.roomPromotionRepo.findOneBy({ id })
        console.log(roomPromotion)
        if (!roomPromotion)
            throw new NotFoundException("Room-Promotion not found");
        await this.entityManager.transaction(async (transactionManager) => {
            await transactionManager.delete(RoomPromotionDetails, { roomPromotionId: id })
            await transactionManager.delete(RoomPromotion, id);
        })
    }

    async getRoomPromotionDetails(roomPromotionId: string): Promise<RoomPromotionDetails[]> {
        let promotion = undefined;
        const current = new Date()
        if (roomPromotionId) {
            promotion = await this.roomPromotionDetailRepo.find({
                where: { roomPromotionId: roomPromotionId, dateStart: LessThanOrEqual(current), dateEnd: MoreThanOrEqual(current) }
            });
        }
        return promotion
    }

    async getRoomPromotionWithRoomPromotionDeltails(roomPromotionId: string): Promise<RoomPromotionDetails[]> {
        let promotion = undefined;
        if (roomPromotionId) {
            promotion = await this.roomPromotionRepo.findOneBy({ id: roomPromotionId });
        }
        return promotion
    }
}
