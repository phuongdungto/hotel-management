import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { RoomPromotionDetails } from './room-promotion-detail.entity';
import { RoomPromotion } from '../room-promotion/room-promotion.entity';
import { RoomPromotionService } from '../room-promotion/room-promotion.service';
import { Rooms } from '../rooms/rooms.entity';
import { RoomsService } from '../rooms/rooms.service';

@Resolver(() => RoomPromotionDetails)
export class RoomPromotionDetailResolver {
    constructor(
        private roomPromotionService: RoomPromotionService,
        private roomService: RoomsService

    ) { }

    @ResolveField(() => RoomPromotion, { nullable: true })
    async roomPromotion(@Parent() roomPromotionDetail: RoomPromotionDetails) {
        return await this.roomPromotionService.getRoomPromotionWithRoomPromotionDeltails(roomPromotionDetail.roomPromotionId)
    }
    @ResolveField(() => Rooms, { nullable: true })
    async room(@Parent() roomPromotionDetail: RoomPromotionDetails) {
        return await this.roomService.getRoomWithPromotionDetails(roomPromotionDetail.roomId);
    }
}
