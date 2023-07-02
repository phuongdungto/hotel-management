import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/entities/base.entity';
import { Gender, Roles } from '../core/enum';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { PurchasesOrder } from '../purchase-order/purchase-order.entity';
import { Bill } from '../bills/bills.entity';

@Entity('users')
export class User extends baseEntity {
    constructor(data: Partial<User>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    numberPhone: string;

    @Column({ unique: true })
    nationalId: string

    @Column()
    salary: number

    @Column()
    address: string;

    @Column()
    birthday: Date;

    @Column({
        name: 'gender',
        type: 'enum',
        enum: Gender,
    })
    gender: string;

    @Column({
        name: 'role',
        type: 'enum',
        enum: Roles,
        default: Roles.STAFF,
        nullable: false
    })
    role: string;

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @OneToMany(() => RoomReservation, roomReservation => roomReservation.staff)
    roomReservations: Relation<RoomReservation>[]

    @OneToMany(() => PurchasesOrder, purchasesOrder => purchasesOrder.staff)
    purchaseOrders: Relation<PurchasesOrder>[]

    @OneToMany(() => Bill, Bill => Bill.staff)
    bills: Relation<Bill>[]
}