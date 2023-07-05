import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsStyle } from './room-style.entity';
import { Repository } from 'typeorm';
import { createRoomStypeInput, getRoomStylesInput, updateRoomStyleInput } from './rooms-style.input';
import { getRoomStylesType } from './rooms-style.types';
import { BuildPagination } from '../core/utils/pagination.utils';

@Injectable()
export class RoomsStyleService {
    constructor(
        @InjectRepository(RoomsStyle) private roomStypeRepo: Repository<RoomsStyle>
    ) { }

    async createRoomStyle(input: createRoomStypeInput): Promise<RoomsStyle> {
        const roomStyle = await this.roomStypeRepo.findOneBy({ name: input.name });
        if (roomStyle) {
            throw new BadRequestException("Room-Style name already exists");
        }
        return await this.roomStypeRepo.save(input);
    }

    async updateRoomStyle(input: updateRoomStyleInput): Promise<RoomsStyle> {
        console.log(input.id);
        const roomStyle = await this.roomStypeRepo.findOneBy({ id: input.id });
        console.log(roomStyle);
        let exists = undefined;
        if (input.name) {
            exists = await this.roomStypeRepo.findOneBy({ name: input.name });
        }
        if (!roomStyle) {
            throw new NotFoundException("Room-Style not Found.");
        }
        if (exists) {
            throw new BadRequestException("Room-Style name already exists");
        }
        Object.assign(roomStyle, input)
        return await this.roomStypeRepo.save(roomStyle);
    }

    async deleteRoomStyle(id: string) {
        const roomStyle = await this.roomStypeRepo.findOneBy({ id });
        if (!roomStyle) {
            throw new NotFoundException("Room-Style not Found.");
        }
        await this.roomStypeRepo.softDelete(id);
    }

    async getRoomStyle(id: string): Promise<RoomsStyle> {
        const roomStyle = await this.roomStypeRepo.findOneBy({ id });
        if (!roomStyle) {
            throw new NotFoundException("Room-Style not Found.");
        }
        return roomStyle;
    }

    async getRoomStyles(input: getRoomStylesInput): Promise<getRoomStylesType> {
        const query = BuildPagination(RoomsStyle, input);
        const [rows, count] = await this.roomStypeRepo.findAndCount({
            ...query
        })
        return { totalPage: Math.ceil(count / input.limit), roomStyles: rows }
    }

}
