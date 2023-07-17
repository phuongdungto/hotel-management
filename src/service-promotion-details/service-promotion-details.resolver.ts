import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ServicePromotionService } from '../service-promotion/service-promotion.service';
import { Service } from '../services/service.entity';
import { ServicesService } from '../services/services.service';
import { ServicePromotionDetails } from './service-promotion-detail.entity';
import { ServicePromotion } from '../service-promotion/service-promotion.entity';

@Resolver(() => ServicePromotionDetails)
export class ServicePromotionDetailsResolver {
    constructor(
        private servicePromotionService: ServicePromotionService,
        private servicesService: ServicesService

    ) { }

    @ResolveField(() => ServicePromotion)
    async servicePromotions(@Parent() servivePromotionDetail: ServicePromotionDetails) {
        return await this.servicePromotionService.getServicePromotionWithServicePromotionDeltails(servivePromotionDetail.servicePromotionId)
    }
    @ResolveField(() => Service)
    async services(@Parent() servivePromotionDetail: ServicePromotionDetails) {
        return await this.servicesService.getService(servivePromotionDetail.serviceId);
    }
}
