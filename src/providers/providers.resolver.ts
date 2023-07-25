import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { createProviderInput, getProvidersInput, updateProviderInput } from './providers.input';
import { getProvidersType } from './providers.types';
import { Providers } from './providers.entity';
import { responseUntil } from '../core/utils/response.utils';
import { PurchasesOrder } from '../purchase-order/purchase-order.entity';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';

@Resolver(() => Providers)
export class ProvidersResolver {
    constructor(
        private providerService: ProvidersService,
        private purchaseOrderService: PurchaseOrderService
    ) { }

    @Mutation(returns => Providers)
    async createProvider(@Args('createProviderInput') input: createProviderInput): Promise<Providers> {
        return await this.providerService.createProvider(input);
    }

    @Mutation(returns => responseUntil)
    async deleteProvider(@Args('id') id: string) {
        await this.providerService.deleteProvide(id);
        return {
            code: "SUCCESS",
            message: "deleted Provider Successfull",
        }
    }

    @Mutation(returns => Providers)
    async updateProvider(@Args('updateProviderInput') input: updateProviderInput): Promise<Providers> {
        return await this.providerService.updateProvider(input)
    }

    @Query(returns => Providers)
    async getProvider(@Args('id') id: string): Promise<Providers> {
        return await this.providerService.getProvider(id);
    }

    @Query(returns => getProvidersType)
    async getProviders(@Args('getProviderInput') input: getProvidersInput): Promise<getProvidersType> {
        return await this.providerService.getProviders(input);
    }

    @ResolveField(() => [PurchasesOrder], { nullable: true })
    async purchaseOrders(@Parent() providers: Providers): Promise<PurchasesOrder[]> {
        return await this.purchaseOrderService.getPurchaseOrderWithProviders(providers.id)
    }
}
