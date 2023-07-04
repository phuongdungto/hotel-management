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
import { BillDetail } from '../bill-details/bill-detail.entity';

@Entity('bills')
export class Bill extends baseEntity {
    constructor(data: Partial<Bill>) {
        super();
        Object.assign(this, data);
    }

    @ManyToOne(() => User, user => user.bills)
    @JoinColumn()
    staff: Relation<User>;

    @Column()
    staffId: string

    @ManyToOne(() => RoomReservation, RoomReservation => RoomReservation.bills)
    @JoinColumn()
    roomReservation: Relation<RoomReservation>;

    @Column()
    roomReservationId: string

    @OneToMany(() => BillDetail, BillDetail => BillDetail.bill)
    billDetails: Relation<BillDetail>[]
}