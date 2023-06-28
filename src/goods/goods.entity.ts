import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { baseEntity } from '../core/entities/base.entity';
import { PurchasesOrderDetail } from '../purchase-order-details/purchase-order-details.entity';

@Entity('goods')
export class Goods extends baseEntity {
    constructor(data: Partial<Goods>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    numberOfGoods: number;

    @Column()
    pirce: number;

    @OneToMany(() => PurchasesOrderDetail, purchasesOrderDetail => purchasesOrderDetail.goods)
    purchasesOrderDetails: Relation<PurchasesOrderDetail>[]
}