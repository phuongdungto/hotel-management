import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { PurchasesOrder } from './purchase-order.entity';
import { EntityManager, Repository } from 'typeorm';
import { createPurchaseOrderInput, getPurchaseOrdersInput, updatePurchaseOrderInput } from './purchase-order.input';
import { PurchasesOrderDetail } from '../purchase-order-details/purchase-order-details.entity';
import { getIds } from '../core/utils/check.utils';
import { BuildPagination } from 'src/core/utils/pagination.utils';
import { getPurchaseOdersType } from './purchase-order.types';

@Injectable()
export class PurchaseOrderService {
    constructor(
        @InjectRepository(PurchasesOrder) private purchaseOderRepo: Repository<PurchasesOrder>,
        @InjectRepository(PurchasesOrderDetail) private purchaseOderDetailRepo: Repository<PurchasesOrderDetail>,
        @InjectEntityManager() readonly entityManager: EntityManager
    ) { }

    async createPurchaseOrder(input: createPurchaseOrderInput): Promise<PurchasesOrder> {
        const { purchaseOrderDetails, ...purchaseOrder } = input;
        const purchaseDto = new PurchasesOrder(purchaseOrder);
        await this.entityManager.transaction(async (transactionManager) => {
            const newPurchase = await transactionManager.save(purchaseDto);
            const details = purchaseOrderDetails.map((item: PurchasesOrderDetail) => {
                return {
                    ...item,
                    purchaseOrderId: newPurchase.id
                }
            });
            const newDetails = transactionManager.getRepository(PurchasesOrderDetail).create(details);
            await transactionManager.insert(PurchasesOrderDetail, newDetails);
        })
        return purchaseDto;
    }

    async updatePurchaseOrder(input: updatePurchaseOrderInput): Promise<PurchasesOrder> {
        const purchase = await this.purchaseOderRepo.findOne({
            where: { id: input.id },
            relations: {
                purchasesOrderDetails: true
            }
        })
        if (!purchase) {
            throw new BadRequestException("PurchaseOrder not found")
        }
        const { purchaseOrderDetails, ...purchaseOrder } = input;
        const purchaseDto = new PurchasesOrder(purchaseOrder);
        Object.assign(purchase, purchaseDto);
        await this.entityManager.transaction(async (transactionManager) => {
            const newPurchase = await transactionManager.save(purchase);
            const detailsIds = getIds(purchase.purchasesOrderDetails, 'id');
            console.log(detailsIds);
            await transactionManager.delete(PurchasesOrderDetail, detailsIds);
            const details = purchaseOrderDetails.map((item: PurchasesOrderDetail) => {
                return {
                    ...item,
                    purchaseOrderId: newPurchase.id
                }
            });
            const newDetails = transactionManager.getRepository(PurchasesOrderDetail).create(details);
            await transactionManager.insert(PurchasesOrderDetail, newDetails);
        })
        console.log(purchase);
        return purchase;
    }

    async deletePurchaseOrder(id: string) {
        const purchase = await this.purchaseOderRepo.findOne({
            where: { id },
            relations: {
                purchasesOrderDetails: true
            }
        })
        if (!purchase) {
            throw new BadRequestException('PurchaseOrder not found');
        }
        const detailsIds = getIds(purchase.purchasesOrderDetails, 'id');
        await this.entityManager.transaction(async (transactionManager) => {
            await transactionManager.delete(PurchasesOrderDetail, detailsIds);
            await transactionManager.delete(PurchasesOrder, purchase.id)
        })
    }

    async getPurchaseOrder(id: string): Promise<PurchasesOrder> {
        const purchase = await this.purchaseOderRepo.findOneBy({ id });
        if (!purchase) {
            throw new BadRequestException("PurchaseOrder not found");
        }
        return purchase;
    }

    async getPurchaseOrders(input: getPurchaseOrdersInput): Promise<getPurchaseOdersType> {
        const query = BuildPagination(PurchasesOrder, input)
        const [rows, count] = await this.purchaseOderRepo.findAndCount({
            ...query
        });
        return { totalPage: Math.ceil(count / input.limit), purchaseOrders: rows };
    }

    async getPurchaseOrderWithProviders(providerId: string) {
        let purchase = undefined;
        if (providerId) {
            purchase = await this.purchaseOderRepo.find({
                where: { providerId: providerId }
            });
        }
        return purchase;
    }

    async getPurchaseDetailsWithPurchaseOrder(purchaseOrderId: string) {
        let details = undefined;
        if (purchaseOrderId) {
            details = await this.purchaseOderDetailRepo.find({
                where: { purchaseOrderId: purchaseOrderId }
            })
        }
        return details;
    }
}
