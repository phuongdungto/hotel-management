import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RoomPromotionService } from './room-promotion.service';
import { createRoomPromotionInput, updateRoomPromotionInput, getRoomPromotionsInput } from './room-promotion.input';
import { RoomPromotion } from './room-promotion.entity';
import { getRoomPromotionsType } from './room-promotion.types';
import { responseUntil } from 'src/core/utils/response.utils';
import { RoomPromotionDetails } from 'src/room-promotion-detail/room-promotion-detail.entity';

@Resolver(() => RoomPromotion)
export class RoomPromotionResolver {
    constructor(
        private roomPromotionService: RoomPromotionService
    ) { }

    @Query(returns => RoomPromotion)
    async getRoomPromotion(@Args('id') id: string) {
        return await this.roomPromotionService.getRoomPromotion(id);
    }

    @Query(returns => getRoomPromotionsType)
    async getRoomPromotions(@Args('getRoomPromotionsInput') input: getRoomPromotionsInput): Promise<getRoomPromotionsType> {
        return await this.roomPromotionService.getRoomPromotions(input);
    }

    @Mutation(returns => RoomPromotion)
    async createRoomPromotion(@Args('createRoomPromotionInput') input: createRoomPromotionInput): Promise<RoomPromotion> {
        return await this.roomPromotionService.createRoomPromotion(input);
    }

    @Mutation(returns => RoomPromotion)
    async updateRoomPromotion(@Args('updateRoomPromotionInput') input: updateRoomPromotionInput): Promise<RoomPromotion> {
        return await this.roomPromotionService.updateRoomPromotion(input);
    }

    @Mutation(returns => responseUntil)
    async deleteRoomPromotion(@Args('id') id: string): Promise<responseUntil> {
        await this.roomPromotionService.deleteRoomPromotion(id);
        return {
            code: "SUCESS",
            message: "delete Room-Promotion successfull"
        }
    }

    @ResolveField(() => [RoomPromotionDetails])
    async roomPromotionDetails(@Parent() roomPromotion: RoomPromotion) {
        return await this.roomPromotionService.getRoomPromotionDetails(roomPromotion.id)
    }
}
