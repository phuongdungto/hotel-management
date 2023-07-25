import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from './rooms.entity';
import { Repository } from 'typeorm';
import { createRoomInput, getRoomsInput, updateRoomInput } from './rooms.input';
import { getRoomsType, roomType } from './rooms.types';
import { BuildPagination } from '../core/utils/pagination.utils';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Rooms) private roomRepo: Repository<Rooms>,
        @InjectRepository(RoomPromotionDetails) private roomPromotionDetaiRepo: Repository<RoomPromotionDetails>
    ) { }

    async createRoom(input: createRoomInput): Promise<Rooms> {
        const room = await this.roomRepo.findOneBy({ name: input.name });
        if (room) {
            throw new BadRequestException('Room name already exists');
        }
        return await this.roomRepo.save(input);
    }

    async updateRoom(input: updateRoomInput): Promise<Rooms> {
        const room = await this.roomRepo.findOneBy({ id: input.id });
        if (!room) {
            throw new NotFoundException("Room not found.");
        }
        let exists = undefined;
        if (input.name) {
            exists = await this.roomRepo.findOneBy({ name: input.name });
        }
        if (exists) {
            throw new BadRequestException("Room name already exists");
        }
        Object.assign(room, input);
        return await this.roomRepo.save(room);
    }

    async deleteRoom(id: string) {
        const room = await this.roomRepo.findOneBy({ id });
        if (!room) {
            throw new NotFoundException("Room not found");
        }
        await this.roomRepo.softDelete(id);
    }

    async getRoom(id: string): Promise<roomType> {
        let room = await this.roomRepo.findOne({
            where: { id: id },
            relations: {
                roomPromotionDetails: {
                    roomPromotion: true
                }
            }
        });
        if (!room) {
            throw new NotFoundException("Room not found");
        }
        const currentDate = new Date();
        let percent = 0;
        let roomPromotion = null;
        room.roomPromotionDetails.forEach((item) => {
            if (item.dateStart <= currentDate && item.dateEnd >= currentDate) {
                percent = item.roomPromotion.percent;
                roomPromotion = item.roomPromotion.name;
            }
        })
        delete room.roomPromotionDetails
        return {
            ...room,
            percent: percent,
            roomPromotion: roomPromotion
        };
    }

    async getRooms(input: getRoomsInput): Promise<getRoomsType> {
        const query = BuildPagination(Rooms, input);
        let [rows, count] = await this.roomRepo.findAndCount({
            ...query,
            relations: {
                roomPromotionDetails: {
                    roomPromotion: true
                }
            }
        })
        const currentDate = new Date();
        rows.forEach((item1: roomType, index1, arr1) => {
            let percent = 0;
            let roomPromotion = null;
            item1.roomPromotionDetails.forEach((item, index, arr) => {
                if (item.dateStart <= currentDate && item.dateEnd >= currentDate) {
                    percent = item.roomPromotion.percent;
                    roomPromotion = item.roomPromotion.name;
                }
            })
            item1.percent = percent;
            item1.roomPromotion = roomPromotion;
            delete item1.roomPromotionDetails
        })
        console.log(rows)
        return { totalPage: Math.ceil(count / input.limit), rooms: rows as [roomType] }
    }

    async getRoomsWithRoomStlye(roomStyleId: string) {
        const rooms = await this.roomRepo.find({
            where: {
                roomStyleId: roomStyleId
            }
        })
        return rooms;
    }

    async getRoomPromotionDetails(roomId: string) {
        let rooms = undefined;
        if (roomId) {
            rooms = await this.roomPromotionDetaiRepo.findBy({ roomId: roomId });
        }
        return rooms
    }

    async getRoomWithPromotionDetails(roomId: string): Promise<Rooms> {
        let rooms = undefined;
        if (roomId) {
            rooms = await this.roomRepo.findOneBy({ id: roomId });
        }
        return rooms
    }

    async getRoomWithReservation(roomId: string): Promise<roomType> {
        let room = await this.roomRepo.findOne({
            where: { id: roomId },
            relations: {
                roomPromotionDetails: {
                    roomPromotion: true
                }
            }
        });
        const currentDate = new Date();
        let percent = 0;
        let roomPromotion = null;
        room.roomPromotionDetails.forEach((item) => {
            if (item.dateStart <= currentDate && item.dateEnd >= currentDate) {

                percent = item.roomPromotion.percent;
                roomPromotion = item.roomPromotion.name;
            }
        })
        delete room.roomPromotionDetails
        return {
            ...room,
            percent,
            roomPromotion
        };
    }
}
