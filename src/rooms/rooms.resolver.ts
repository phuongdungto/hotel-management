import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Rooms } from './rooms.entity';
import { createRoomInput, getRoomsInput, updateRoomInput } from './rooms.input';
import { responseUntil } from '../core/utils/response.utils';
import { getRoomsType, roomType } from './rooms.types';
import { RoomsStyle } from '../rooms-style/room-style.entity';
import { RoomsStyleService } from 'src/rooms-style/rooms-style.service';
import { RoomPromotionDetails } from 'src/room-promotion-detail/room-promotion-detail.entity';

@Resolver(() => roomType)
export class RoomsResolver {
    constructor(
        private roomService: RoomsService,
        private roomStyleService: RoomsStyleService
    ) { }

    @Query(returns => roomType)
    async getRoom(@Args('id') id: string): Promise<roomType> {
        return await this.roomService.getRoom(id);
    }

    @Query(returns => getRoomsType)
    async getRooms(@Args('getRoomsInput') input: getRoomsInput): Promise<getRoomsType> {
        return await this.roomService.getRooms(input);
    }

    @Mutation(returns => Rooms)
    async createRoom(@Args('createRoomInput') input: createRoomInput): Promise<Rooms> {
        return await this.roomService.createRoom(input);
    }

    @Mutation(retuns => Rooms)
    async updateRoom(@Args('updateRoomInput') input: updateRoomInput): Promise<Rooms> {
        return await this.roomService.updateRoom(input);
    }

    @Mutation(returns => responseUntil)
    async deleteRoom(@Args('id') id: string): Promise<responseUntil> {
        await this.roomService.deleteRoom(id);
        return {
            code: "SUCCESS",
            message: "deleted Room Sucessfull"
        }
    }

    @ResolveField(() => RoomsStyle)
    async roomStyle(@Parent() room: Rooms) {
        return await this.roomStyleService.getRoomStyle(room.roomStyleId);
    }

    @ResolveField(() => [RoomPromotionDetails])
    async roomPromotionDetails(@Parent() room: Rooms) {
        return await this.roomService.getRoomPromotionDetails(room.id);
    }
}
