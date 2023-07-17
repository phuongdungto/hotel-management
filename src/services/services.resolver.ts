import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { createServiceInput, getServicesInput, updateServiceInput } from './services.input';
import { Service } from './service.entity';
import { getServicesType } from './services.types';
import { responseUntil } from '../core/utils/response.utils';
import { ServicePromotionDetails } from 'src/service-promotion-details/service-promotion-detail.entity';

@Resolver(() => Service)
export class ServicesResolver {
    constructor(
        private serviceService: ServicesService,
    ) { }

    @Query(returns => Service)
    async getService(@Args('id') id: string): Promise<Service> {
        return await this.serviceService.getService(id);
    }

    @Query(returns => getServicesType)
    async getServices(@Args('getServicesInput') input: getServicesInput): Promise<getServicesType> {
        return await this.serviceService.getServices(input);
    }

    @Mutation(returns => Service)
    async createService(@Args('createServiceInput') input: createServiceInput): Promise<Service> {
        return await this.serviceService.createService(input);
    }

    @Mutation(returns => Service)
    async updateService(@Args('updateServiceInput') input: updateServiceInput): Promise<Service> {
        return await this.serviceService.updateService(input)
    }

    @Mutation(returns => responseUntil)
    async deleteService(@Args('id') id: string): Promise<responseUntil> {
        await this.serviceService.deleteService(id);
        return {
            code: "SUCCESS",
            message: "delete Service successfull"
        }
    }

    @ResolveField(() => [ServicePromotionDetails])
    async servicePromotionDetails(@Parent() service: Service) {
        return await this.serviceService.getPromotionDetailsWithId(service.id)
    }
}
