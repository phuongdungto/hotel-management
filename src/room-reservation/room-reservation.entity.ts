import { Customer } from '../customers/customers.entity';
import { baseEntity } from '../core/extends/base.entity';
import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Relation,
    OneToOne,
} from 'typeorm';
import { User } from '../users/users.entity';
import { RoomReservationDetail } from '../room-reservation-detail/room-reservation-detail.entity';
import { Bill } from '../bills/bills.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('room_reservation')
export class RoomReservation extends baseEntity {
    constructor(data?: Partial<RoomReservation>) {
        super();
        Object.assign(this, data);
    }

    @Field()
    @Column()
    numberOfRoom: number;

    @Field()
    @Column()
    checkIn: Date;

    @Field()
    @Column()
    checkOut: Date;

    @ManyToOne(() => Customer, customer => customer.roomReservations)
    @JoinColumn()
    customer: Relation<Customer>;

    @Field()
    @Column()
    customerId: string

    @ManyToOne(() => User, user => user.roomReservations)
    @JoinColumn()
    staff: Relation<User>;

    @Field()
    @Column()
    staffId: string

    @OneToMany(() => RoomReservationDetail, roomReservationDetail => roomReservationDetail.roomReservation)
    roomReservationDetails: Relation<RoomReservationDetail>[]

    @OneToOne(() => Bill, Bill => Bill.roomReservation)
    @JoinColumn()
    bill: Relation<Bill>

    @Column({ nullable: true, default: null })
    billId: string

}