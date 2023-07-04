import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GoodsService } from './goods.service';
import { getGoodsListType, goodsType } from './goods.types';
import { Goods } from './goods.entity';
import { createGoodsInput, getGoodsListInput, updateGoodsInput } from './goods.input';
import { responseUntil } from 'src/core/utils/response.utils';

@Resolver()
export class GoodsResolver {
    constructor(
        private goodsService: GoodsService
    ) { }

    @Mutation(returns => goodsType)
    async createGoods(@Args('createGoodsInput') input: createGoodsInput): Promise<Goods> {
        return await this.goodsService.createGoods(input)
    }

    @Mutation(returns => goodsType)
    async updateGoods(@Args('id') id: string, @Args('updateGoodsInput') input: updateGoodsInput): Promise<Goods> {
        return await this.goodsService.updateGoods(id, input)
    }

    @Mutation(returns => responseUntil)
    async deleteGoods(@Args('id') id: string): Promise<responseUntil> {
        await this.goodsService.deleteGoods(id);
        return {
            code: "SUCCESS",
            message: "deleted Goods successfull"
        }
    }

    @Query(returns => goodsType)
    async getGoods(@Args('id') id: string): Promise<Goods> {
        return await this.goodsService.getGoods(id);
    }

    @Query(returns => getGoodsListType)
    async getGoodsList(@Args('getGoodsListInput') input: getGoodsListInput): Promise<getGoodsListType> {
        return await this.goodsService.getGoodsList(input);
    }
}
