import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from './goods.entity';
import { Repository } from 'typeorm';
import { createGoodsInput, getGoodsListInput, updateGoodsInput } from './goods.input';
import { BuildPagination } from '../core/utils/pagination.utils';
import { getGoodsListType } from './goods.types';

@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(Goods) private goodsRepo: Repository<Goods>
    ) { }

    async createGoods(input: createGoodsInput): Promise<Goods> {
        const goods = await this.goodsRepo.findOneBy({ name: input.name })
        if (goods) {
            throw new BadRequestException("Goods already exists");
        }
        return await this.goodsRepo.save(input);
    }

    async updateGoods(id: string, input: updateGoodsInput): Promise<Goods> {
        const goods = await this.goodsRepo.findOneBy({ id })
        let exists = undefined;
        if (input.name) {
            exists = await this.goodsRepo.findOneBy({ name: input.name })
        }
        if (!goods) {
            throw new NotFoundException("Goods not found");
        }
        if (exists) {
            throw new BadRequestException("Goods name already exists");
        }
        Object.assign(goods, input);
        return await this.goodsRepo.save(goods);
    }

    async deleteGoods(id: string) {
        const goods = await this.goodsRepo.findOneBy({ id })
        if (!goods) {
            throw new NotFoundException("Goods not found");
        }
        await this.goodsRepo.softDelete(goods);
    }

    async getGoods(id: string): Promise<Goods> {
        const goods = await this.goodsRepo.findOneBy({ id });
        if (!goods) {
            throw new NotFoundException("Goods not found");
        }
        return goods;
    }

    async getGoodsList(input: getGoodsListInput): Promise<getGoodsListType> {
        const query = BuildPagination(Goods, input);
        const [rows, count] = await this.goodsRepo.findAndCount({
            ...query
        });
        return { totalPage: Math.ceil(count / input.limit), goods: rows }
    }
}
