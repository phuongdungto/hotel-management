import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { createProviderInput, getProvidersInput, updateProviderInput } from './providers.input';
import { getProvidersType, providerType } from './providers.types';
import { Providers } from './providers.entity';
import { responseUntil } from 'src/core/utils/response.utils';

@Resolver()
export class ProvidersResolver {
    constructor(
        private providerService: ProvidersService
    ) { }

    @Mutation(returns => providerType)
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

    @Mutation(returns => providerType)
    async updateProvider(@Args('id') id: string, @Args('updateProviderInput') input: updateProviderInput): Promise<Providers> {
        return await this.providerService.updateProvider(id, input)
    }

    @Query(returns => providerType)
    async getProvider(@Args('id') id: string): Promise<Providers> {
        return await this.providerService.getProvider(id);
    }

    @Query(returns => getProvidersType)
    async getProviders(@Args('getProviderInput') input: getProvidersInput): Promise<getProvidersType> {
        return await this.providerService.getProviders(input);
    }
}
