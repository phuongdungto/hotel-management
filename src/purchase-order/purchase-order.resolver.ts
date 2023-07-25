import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PurchaseOrderService } from './purchase-order.service';
import { createPurchaseOrderInput, getPurchaseOrdersInput, updatePurchaseOrderInput } from './purchase-order.input';
import { PurchasesOrder } from './purchase-order.entity';
import { ReqUser } from '../users/interfaces/user.interface';
import { UseGuards } from "@nestjs/common/decorators";
import { AuthGuard } from '../auth/auth.guard';
import { responseUntil } from '../core/utils/response.utils';
import { getPurchaseOdersType } from './purchase-order.types';
import { Providers } from '../providers/providers.entity';
import { ProvidersService } from '../providers/providers.service';
import { PurchasesOrderDetail } from '../purchase-order-details/purchase-order-details.entity';

@Resolver(() => PurchasesOrder)
export class PurchaseOrderResolver {
    constructor(
        private purchaseOderService: PurchaseOrderService,
        private providerService: ProvidersService
    ) { }

    @Mutation(returns => PurchasesOrder)
    @UseGuards(AuthGuard)
    async createPurchaseOrder(
        @Args('createPurchaseOrderInput') input: createPurchaseOrderInput,
        @Context('user') user: ReqUser
    ): Promise<PurchasesOrder> {
        const newInput = {
            ...input,
            staffId: user.id
        }
        return await this.purchaseOderService.createPurchaseOrder(newInput);
    }

    @Mutation(returns => PurchasesOrder)
    async updatePurchaseOrder(@Args('updatePurchaseOrderInput') input: updatePurchaseOrderInput): Promise<PurchasesOrder> {
        return await this.purchaseOderService.updatePurchaseOrder(input);
    }

    @Mutation(returns => responseUntil)
    async deletePurchaseOrder(@Args('id') id: string): Promise<responseUntil> {
        await this.purchaseOderService.deletePurchaseOrder(id);
        return {
            code: "SUCCESS",
            message: "deleted PurchaseOrder successfull"
        }
    }

    @Query(returns => PurchasesOrder)
    async getPurchaseOrder(@Args('id') id: string): Promise<PurchasesOrder> {
        return await this.purchaseOderService.getPurchaseOrder(id);
    }

    @Query(returns => getPurchaseOdersType)
    async getPurchaseOrders(@Args('getPurchaseOrdersInput') input: getPurchaseOrdersInput) {
        return await this.purchaseOderService.getPurchaseOrders(input)
    }

    @ResolveField(() => Providers)
    async provider(@Parent() purchasesOrder: PurchasesOrder) {
        return this.providerService.getProvider(purchasesOrder.providerId);
    }

    @ResolveField(() => [PurchasesOrderDetail])
    async purchasesOrderDetails(@Parent() purchasesOrder: PurchasesOrder): Promise<PurchasesOrderDetail[]> {
        return this.purchaseOderService.getPurchaseDetailsWithPurchaseOrder(purchasesOrder.id)
    }
}
