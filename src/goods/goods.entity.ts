import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { baseEntity } from '../core/extends/base.entity';
import { PurchasesOrderDetail } from '../purchase-order-details/purchase-order-details.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('goods')
export class Goods extends baseEntity {
    constructor(data?: Partial<Goods>) {
        super();
        Object.assign(this, data);
    }

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    numberOfGoods: number;

    @Field()
    @Column()
    pirce: number;

    @OneToMany(() => PurchasesOrderDetail, purchasesOrderDetail => purchasesOrderDetail.goods)
    purchasesOrderDetails: Relation<PurchasesOrderDetail>[]
}