import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/entities/base.entity';
import { Roles } from '../core/enum';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { PurchasesOrder } from '../purchase-order/purchase-order.entity';

@Entity('providers')
export class Providers extends baseEntity {
    constructor(data: Partial<Providers>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    numberPhone: string

    @Column()
    password: string

    @OneToMany(() => PurchasesOrder, purchasesOrder => purchasesOrder.provider)
    purchaseOrders: Relation<PurchasesOrder>[]

}