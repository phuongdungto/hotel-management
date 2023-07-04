import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/extends/base.entity';
import { Roles } from '../core/enum';
import {
    Entity,
    Column,
    Relation,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Providers } from '../providers/providers.entity';
import { PurchasesOrderDetail } from '../purchase-order-details/purchase-order-details.entity';

@Entity('purchases_order')
export class PurchasesOrder extends baseEntity {
    constructor(data: Partial<PurchasesOrder>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    total: number

    @ManyToOne(() => User, user => user.purchaseOrders)
    @JoinColumn()
    staff: Relation<User>;

    @Column()
    staffId: string

    @ManyToOne(() => Providers, provider => provider.purchaseOrders)
    @JoinColumn()
    provider: Relation<Providers>;

    @Column()
    providerId: string

    @OneToMany(() => PurchasesOrderDetail, purchasesOrderDetail => purchasesOrderDetail.purchaseOrder)
    purchasesOrderDetails: Relation<PurchasesOrderDetail>[]
}