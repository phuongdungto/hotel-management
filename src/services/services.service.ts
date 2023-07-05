import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Repository } from 'typeorm';
import { createServiceInput, getServicesInput, updateServiceInput } from './services.input';
import { BuildPagination } from 'src/core/utils/pagination.utils';
import { getServicesType } from './services.types';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service) private serviceRepo: Repository<Service>
    ) { }

    async getService(id: string): Promise<Service> {
        const service = await this.serviceRepo.findOneBy({ id });
        if (!service)
            throw new NotFoundException("Service not found");
        return service;
    }

    async getServices(input: getServicesInput): Promise<getServicesType> {
        const query = BuildPagination(Service, input);
        const [rows, count] = await this.serviceRepo.findAndCount({
            ...query
        })
        return { totalPage: Math.ceil(count / input.limit), services: rows }
    }

    async createService(input: createServiceInput): Promise<Service> {
        const exists = await this.serviceRepo.findOneBy({ name: input.name });
        if (exists) {
            throw new BadRequestException("Service name already exists");
        }
        return await this.serviceRepo.save(input);
    }

    async updateService(input: updateServiceInput): Promise<Service> {
        const serivice = await this.serviceRepo.findOneBy({ id: input.id });
        if (!serivice) {
            throw new NotFoundException("Service not found");
        }
        const exists = await this.serviceRepo.findOneBy({ name: input.name })
        if (exists) {
            throw new BadRequestException("Service name already exists");
        }
        Object.assign(serivice, input);
        return await this.serviceRepo.save(serivice);
    }

    async deleteService(id: string) {
        const serivice = await this.serviceRepo.findOneBy({ id });
        if (!serivice) {
            throw new NotFoundException("Service not found");
        }
        await this.serviceRepo.softDelete(id);
    }
}
