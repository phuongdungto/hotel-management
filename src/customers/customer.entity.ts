import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/entities/base.entity';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';

@Entity('customers')
export class Customer extends baseEntity {
    constructor(data: Partial<Customer>) {
        super();
        Object.assign(this, data);
    }

    @Column({ unique: true })
    nationalId: string

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    numberPhone: string;

    @Column()
    address: string;

    @Column()
    birthday: string;

    @Column()
    gender: string;

    @OneToMany(() => RoomReservation, roomReservation => roomReservation.customer)
    roomReservations: Relation<RoomReservation>[]
}