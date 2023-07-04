import { baseEntity } from '../core/extends/base.entity';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { PurchasesOrder } from '../purchase-order/purchase-order.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('providers')
export class Providers extends baseEntity {
    constructor(data?: Partial<Providers>) {
        super();
        Object.assign(this, data);
    }

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    address: string

    @Field()
    @Column()
    numberPhone: string

    @OneToMany(() => PurchasesOrder, purchasesOrder => purchasesOrder.provider)
    purchaseOrders: Relation<PurchasesOrder>[]

}