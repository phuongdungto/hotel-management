import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ServicePromotion } from './service-promotion.entity';
import { ServicePromotionDetails } from 'src/service-promotion-details/service-promotion-detail.entity';
import { EntityManager, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { createServicePromotionInput, getServicePromotionsInput, updateServicePromotionInput } from './service-promotion.input';
import { BuildPagination } from 'src/core/utils/pagination.utils';
import { getServicePromotionsType } from './service-promotion.types';

@Injectable()
export class ServicePromotionService {
    constructor(
        @InjectRepository(ServicePromotion) private ServicePromotionRepo: Repository<ServicePromotion>,
        @InjectRepository(ServicePromotionDetails) private ServicePromotionDetailRepo: Repository<ServicePromotionDetails>,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) { }

    async createServicePromotion(input: createServicePromotionInput): Promise<ServicePromotion> {
        if (input.dateStart > input.dateEnd) {
            throw new BadRequestException("Start date must not be greater than end date")
        }
        const { servicePromotionDetails, ...filter } = input;
        const newServicePromotion = new ServicePromotion(filter);
        await this.entityManager.transaction(async (transactionManager) => {
            const servicePromotion = await transactionManager.save(newServicePromotion);
            if (input.servicePromotionDetails) {
                const servicePromotionDetails: Partial<ServicePromotionDetails>[] = input.servicePromotionDetails.map(item => {
                    return {
                        ...item,
                        servicePromotionId: servicePromotion.id,
                        dateStart: servicePromotion.dateStart,
                        dateEnd: servicePromotion.dateEnd,
                    }
                })
                const newDetails = transactionManager.getRepository(ServicePromotionDetails).create(servicePromotionDetails);

                await transactionManager.insert(ServicePromotionDetails, newDetails);
            }
        })
        return newServicePromotion;
    }

    async updateServicePromotion(input: updateServicePromotionInput): Promise<ServicePromotion> {
        const servicePromotion = await this.ServicePromotionRepo.findOneBy({ id: input.id });
        if (!servicePromotion) {
            throw new NotFoundException("Service-Promotion not found");
        }
        if (input.dateStart > input.dateEnd) {
            throw new BadRequestException("Start date must not be greater than end date")
        }
        const { servicePromotionDetails, ...filter } = input
        Object.assign(servicePromotion, filter);
        const newServicePromotion = new ServicePromotion(servicePromotion);
        await this.entityManager.transaction(async (transactionManager) => {
            const servicePromotion = await transactionManager.save(newServicePromotion);
            if (input.servicePromotionDetails) {
                await transactionManager.delete(ServicePromotionDetails, { servicePromotionId: servicePromotion.id });
                const servicePromotionDetails: Partial<ServicePromotionDetails>[] = input.servicePromotionDetails.map(item => {
                    return {
                        ...item,
                        servicePromotionId: servicePromotion.id,
                        dateStart: servicePromotion.dateStart,
                        dateEnd: servicePromotion.dateEnd
                    }
                })
                const newDetails = transactionManager.getRepository(ServicePromotionDetails).create(servicePromotionDetails);

                await transactionManager.insert(ServicePromotionDetails, newDetails);
            }
        })
        return newServicePromotion;
    }

    async getServicePromotion(id: string): Promise<ServicePromotion> {
        const ServicePromotion = await this.ServicePromotionRepo.findOneBy({ id });
        if (!ServicePromotion)
            throw new NotFoundException("Serivce-Promotion not found");
        return ServicePromotion;
    }

    async getServicePromotions(input: getServicePromotionsInput): Promise<getServicePromotionsType> {
        const query = BuildPagination(ServicePromotion, input);
        const [rows, count] = await this.ServicePromotionRepo.findAndCount({
            ...query
        });
        return { totalPage: Math.ceil(count / input.limit), servicePromotions: rows }
    }

    async deleteServicePromotion(id: string) {
        const servicePromotion = await this.ServicePromotionRepo.findOneBy({ id })
        if (!servicePromotion)
            throw new NotFoundException("Serivce-Promotion not found");
        await this.entityManager.transaction(async (transactionManager) => {
            await transactionManager.delete(ServicePromotionDetails, { servicePromotionId: id })
            await transactionManager.delete(ServicePromotion, id);
        })
    }

    async getServicePromotionDetails(ServicePromotionId: string): Promise<ServicePromotionDetails[]> {
        let promotion = undefined;
        const current = new Date()
        if (ServicePromotionId) {
            promotion = await this.ServicePromotionDetailRepo.find({
                where: { servicePromotionId: ServicePromotionId, dateStart: LessThanOrEqual(current), dateEnd: MoreThanOrEqual(current) }
            });
        }
        return promotion
    }

    async getServicePromotionWithServicePromotionDeltails(ServicePromotionId: string): Promise<ServicePromotionDetails[]> {
        let promotion = undefined;
        if (ServicePromotionId) {
            promotion = await this.ServicePromotionRepo.findOneBy({ id: ServicePromotionId });
        }
        return promotion
    }
}
