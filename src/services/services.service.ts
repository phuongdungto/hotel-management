import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { createServiceInput, getServicesInput, updateServiceInput } from './services.input';
import { BuildPagination } from '../core/utils/pagination.utils';
import { getServicesType, serviceType } from './services.types';
import { ServicePromotionDetails } from '../service-promotion-details/service-promotion-detail.entity';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service) private serviceRepo: Repository<Service>,
        @InjectRepository(ServicePromotionDetails) private servicePromotionDetailsRepo: Repository<ServicePromotionDetails>
    ) { }

    async getService(id: string): Promise<serviceType> {
        const currentDate = new Date();
        const service = await this.serviceRepo.findOne({
            where: {
                id
            },
            relations: {
                servicePromotionDetails: {
                    servicePromotion: true
                }
            }
        });
        if (!service)
            throw new NotFoundException("Service not found");
        let percent = 0;
        let servicePromotion = null;
        service.servicePromotionDetails.forEach((item) => {
            if (item.dateStart <= currentDate && item.dateEnd >= currentDate) {
                percent = item.percent;
                servicePromotion = item.servicePromotion.name;
            }
        })
        delete service.servicePromotionDetails
        return {
            ...service,
            percent,
            servicePromotion

        };
    }

    async getServices(input: getServicesInput): Promise<getServicesType> {
        const query = BuildPagination(Service, input);
        const currentDate = new Date();
        const [rows, count] = await this.serviceRepo.findAndCount({
            ...query,
            relations: {
                servicePromotionDetails: {
                    servicePromotion: true
                }
            }

        })
        rows.forEach((item1: serviceType) => {
            let percent = 0;
            let servicePromotion = null;
            item1.servicePromotionDetails.forEach((item) => {
                if (item.dateStart <= currentDate && item.dateEnd >= currentDate) {
                    percent = item.percent;
                    servicePromotion = item.servicePromotion.name;
                }
            })
            item1.percent = percent;
            item1.servicePromotion = servicePromotion;
            delete item1.servicePromotionDetails
        })
        return { totalPage: Math.ceil(count / input.limit), services: rows as [serviceType] }
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

    async getPromotionDetailsWithId(serviceId: string) {
        let serivicePromotions = undefined;
        if (serviceId) {
            serivicePromotions = await this.servicePromotionDetailsRepo.find({
                where: { serviceId: serviceId }
            })
        }
        return serivicePromotions;
    }
}
