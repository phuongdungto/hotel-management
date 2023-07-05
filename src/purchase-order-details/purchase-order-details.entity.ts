import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/extends/base.entity';
import { Roles } from '../core/enum';
import {
    Entity,
    Column,
    Relation,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Providers } from '../providers/providers.entity';
import { PurchasesOrder } from '../purchase-order/purchase-order.entity';
import { Goods } from '../goods/goods.entity';

@Entity('purchases_order_details')
export class PurchasesOrderDetail {
    constructor(data?: Partial<PurchasesOrderDetail>) {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    total: number

    @ManyToOne(() => PurchasesOrder, purchasesOrder => purchasesOrder.purchasesOrderDetails)
    @JoinColumn()
    purchaseOrder: Relation<PurchasesOrder>;

    @Column()
    purchaseOrderId: string

    @ManyToOne(() => Goods, goods => goods.purchasesOrderDetails)
    @JoinColumn()
    goods: Relation<Goods>;

    @Column()
    goodsId: string
}