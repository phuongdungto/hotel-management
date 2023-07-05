import { Customer } from '../customers/customers.entity';
import { baseEntity } from '../core/extends/base.entity';
import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Relation,
} from 'typeorm';
import { User } from '../users/users.entity';
import { RoomReservationDetail } from '../room-reservation-detail/room-reservation-detail.entity';
import { Bill } from '../bills/bills.entity';

@Entity('room_reservation')
export class RoomReservation extends baseEntity {
    constructor(data?: Partial<RoomReservation>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    numberOfRoom: number;

    @Column()
    checkIn: Date;

    @Column()
    checkOut: Date;

    @Column()
    totalRental: number;

    @Column()
    totalPromotion: number;

    @ManyToOne(() => Customer, customer => customer.roomReservations)
    @JoinColumn()
    customer: Relation<Customer>;

    @Column()
    customerId: string

    @ManyToOne(() => User, user => user.roomReservations)
    @JoinColumn()
    staff: Relation<User>;

    @Column()
    staffId: string

    @OneToMany(() => RoomReservationDetail, roomReservationDetail => roomReservationDetail.roomReservation)
    roomReservationDetails: Relation<RoomReservationDetail>[]

    @OneToMany(() => Bill, Bill => Bill.roomReservation)
    bills: Relation<Bill>[]

}