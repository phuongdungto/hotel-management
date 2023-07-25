import {
    Entity,
    Column,
    Relation,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PurchasesOrder } from '../purchase-order/purchase-order.entity';
import { Goods } from '../goods/goods.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('purchases_order_details')
export class PurchasesOrderDetail {
    constructor(data?: Partial<PurchasesOrderDetail>) {
        Object.assign(this, data);
    }

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    quantity: number

    @ManyToOne(() => PurchasesOrder, purchasesOrder => purchasesOrder.purchasesOrderDetails)
    @JoinColumn()
    purchaseOrder: Relation<PurchasesOrder>;

    @Field()
    @Column()
    purchaseOrderId: string

    @ManyToOne(() => Goods, goods => goods.purchasesOrderDetails)
    @JoinColumn()
    goods: Relation<Goods>;

    @Field()
    @Column()
    goodsId: string
}