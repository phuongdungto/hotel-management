import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Providers } from './providers.entity';
import { Repository } from 'typeorm';
import { createProviderInput, updateProviderInput } from './providers.input';
import { getProvidersType } from './providers.types';
import { BuildPagination } from '../core/utils/pagination.utils';

@Injectable()
export class ProvidersService {
    constructor(
        @InjectRepository(Providers) private providerRepo: Repository<Providers>
    ) { }

    async createProvider(input: createProviderInput): Promise<Providers> {
        const existed = await this.providerRepo.findOneBy({ name: input.name })
        if (existed) {
            throw new BadRequestException('Provider already exists');
        }
        return await this.providerRepo.save(input);
    }

    async updateProvider(input: updateProviderInput): Promise<Providers> {
        const provider = await this.providerRepo.findOneBy({ id: input.id })
        let exist = undefined;
        if (input.name) {
            exist = await this.providerRepo.findOneBy({ name: input.name })
        }
        if (!provider) {
            throw new NotFoundException("Provider not found");
        }
        if (exist) {
            throw new BadRequestException("Provider name already exists");
        }
        Object.assign(provider, input)
        return await this.providerRepo.save(provider);
    }

    async deleteProvide(id: string) {
        const provider = await this.providerRepo.findOneBy({ id });
        if (!provider) {
            throw new NotFoundException("Provider not Found");
        }
        await this.providerRepo.softDelete(id);
    }

    async getProvider(id: string): Promise<Providers> {
        const provider = await this.providerRepo.findOneBy({ id });
        if (!provider) {
            throw new NotFoundException("Provider not Found");
        }
        return provider;
    }

    async getProviders(input): Promise<getProvidersType> {
        const query = BuildPagination(Providers, input);
        const [rows, count] = await this.providerRepo.findAndCount({
            ...query
        })
        return { totalPage: Math.ceil(count / input.limit), providers: rows }
    }
}
