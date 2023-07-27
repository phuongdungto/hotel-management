import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RoomsStyleService } from './rooms-style.service';
import { createRoomStypeInput, getRoomStylesInput, updateRoomStyleInput } from './rooms-style.input';
import { getRoomStylesType } from './rooms-style.types';
import { RoomsStyle } from './room-style.entity';
import { responseUntil } from '../core/utils/response.utils';
import { Rooms } from '../rooms/rooms.entity';
import { RoomsService } from '../rooms/rooms.service';

@Resolver(() => RoomsStyle)
export class RoomsStyleResolver {
    constructor(
        private roomsStypeService: RoomsStyleService,
        private roomService: RoomsService
    ) { }

    @Mutation(returns => RoomsStyle)
    async createRoomStyle(@Args('createRoomStypeInput') input: createRoomStypeInput): Promise<createRoomStypeInput> {
        return await this.roomsStypeService.createRoomStyle(input);
    }

    @Mutation(returns => RoomsStyle)
    async updateRoomStyle(@Args('updateRoomStyleInput') input: updateRoomStyleInput): Promise<RoomsStyle> {
        return await this.roomsStypeService.updateRoomStyle(input);
    }

    @Mutation(returns => responseUntil)
    async deleteRoomStyle(@Args('id') id: string): Promise<responseUntil> {
        await this.roomsStypeService.deleteRoomStyle(id);
        return {
            code: "SUCCESS",
            message: "deleted Room-Style successfull"
        }
    }

    @Query(returns => RoomsStyle)
    async getRoomStyle(@Args('id') id: string): Promise<RoomsStyle> {
        return await this.roomsStypeService.getRoomStyle(id);
    }

    @Query(returns => getRoomStylesType)
    async getRoomStyles(@Args('getRoomStylesInput') input: getRoomStylesInput): Promise<getRoomStylesType> {
        return await this.roomsStypeService.getRoomStyles(input);
    }

    @ResolveField(() => [Rooms])
    async rooms(@Parent() roomsStyle: RoomsStyle) {
        return await this.roomService.getRoomsWithRoomStlye(roomsStyle.id)
    }
}
