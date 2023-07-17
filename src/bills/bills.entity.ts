import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/extends/base.entity';
import { BillStatus, Roles } from '../core/enum';
import {
    Entity,
    Column,
    Relation,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { User } from '../users/users.entity';
import { BillDetail } from '../bill-details/bill-detail.entity';

@Entity('bills')
export class Bill extends baseEntity {
    constructor(data?: Partial<Bill>) {
        super();
        Object.assign(this, data);
    }

    @ManyToOne(() => User, user => user.bills)
    @JoinColumn()
    staff: Relation<User>;

    @Column()
    staffId: string

    @OneToOne(() => RoomReservation, RoomReservation => RoomReservation.bill)
    @JoinColumn()
    roomReservation: Relation<RoomReservation>;

    @Column()
    roomReservationId: string

    @Column({
        name: 'status',
        type: 'enum',
        enum: BillStatus,
        default: BillStatus.UNPAID,
        nullable: false
    })
    status: string

    @OneToMany(() => BillDetail, BillDetail => BillDetail.bill)
    billDetails: Relation<BillDetail>[]
}