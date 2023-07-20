import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/extends/base.entity';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Bill } from '../bills/bills.entity';

@ObjectType()
@Entity('customers')
export class Customer extends baseEntity {
    constructor(data?: Partial<Customer>) {
        super();
        Object.assign(this, data);
    }

    @Field()
    @Column({ unique: true })
    nationalId: string

    @Field()
    @Column()
    firstname: string;

    @Field()
    @Column()
    lastname: string;

    @Field()
    @Column()
    numberPhone: string;

    @Field()
    @Column()
    address: string;

    @Field()
    @Column()
    birthday: Date;

    @Column()
    gender: string;

    @OneToMany(() => RoomReservation, roomReservation => roomReservation.customer)
    roomReservations: Relation<RoomReservation>[]

    @OneToMany(() => Bill, bill => bill.customer)
    bills: Relation<Bill>[]
}