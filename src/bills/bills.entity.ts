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
import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from '../customers/customers.entity';

@ObjectType()
@Entity('bills')
export class Bill extends baseEntity {
    constructor(data?: Partial<Bill>) {
        super();
        Object.assign(this, data);
    }

    @ManyToOne(() => User, user => user.bills)
    @JoinColumn()
    staff: Relation<User>;

    @Field()
    @Column()
    staffId: string

    @ManyToOne(() => Customer, customer => customer.bills)
    @JoinColumn()
    customer: Relation<Customer>;

    @Field()
    @Column()
    customerId: string

    @OneToOne(() => RoomReservation, RoomReservation => RoomReservation.bill, { onDelete: "CASCADE" })
    @JoinColumn()
    roomReservation: Relation<RoomReservation>;

    @Field()
    @Column()
    roomReservationId: string

    @Field()
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