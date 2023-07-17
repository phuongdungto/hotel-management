import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ServicePromotion } from './service-promotion.entity';
import { ServicePromotionService } from './service-promotion.service';
import { responseUntil } from '../core/utils/response.utils';
import { ServicePromotionDetails } from '../service-promotion-details/service-promotion-detail.entity';
import { getServicePromotionsType } from './service-promotion.types';
import { createServicePromotionInput, getServicePromotionsInput, updateServicePromotionInput } from './service-promotion.input';

@Resolver(() => ServicePromotion)
export class ServicePromotionResolver {
    constructor(
        private servicePromotionService: ServicePromotionService,
    ) { }

    @Query(returns => ServicePromotion)
    async getServicePromotion(@Args('id') id: string) {
        return await this.servicePromotionService.getServicePromotion(id);
    }

    @Query(returns => getServicePromotionsType)
    async getServicePromotions(@Args('getServicePromotionsInput') input: getServicePromotionsInput): Promise<getServicePromotionsType> {
        return await this.servicePromotionService.getServicePromotions(input);
    }

    @Mutation(returns => ServicePromotion)
    async createServicePromotion(@Args('createServicePromotionInput') input: createServicePromotionInput): Promise<ServicePromotion> {
        return await this.servicePromotionService.createServicePromotion(input);
    }

    @Mutation(returns => ServicePromotion)
    async updateServicePromotion(@Args('updateServicePromotionInput') input: updateServicePromotionInput): Promise<ServicePromotion> {
        return await this.servicePromotionService.updateServicePromotion(input);
    }

    @Mutation(returns => responseUntil)
    async deleteServicePromotion(@Args('id') id: string): Promise<responseUntil> {
        await this.servicePromotionService.deleteServicePromotion(id);
        return {
            code: "SUCESS",
            message: "delete Service-Promotion successfull"
        }
    }

    @ResolveField(() => [ServicePromotionDetails])
    async servicePromotionDetails(@Parent() ServicePromotion: ServicePromotion) {
        return await this.servicePromotionService.getServicePromotionDetails(ServicePromotion.id)
    }
}
