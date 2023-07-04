import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/extends/base.entity';
import { Gender, Roles } from '../core/enum';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { PurchasesOrder } from '../purchase-order/purchase-order.entity';
import { Bill } from '../bills/bills.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('users')
@ObjectType()
export class User extends baseEntity {
    constructor(data?: Partial<User>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    @Field()
    firstname: string

    @Field()
    @Column()
    lastname: string

    @Field()
    @Column()
    numberPhone: string;

    @Field()
    @Column({ unique: true })
    nationalId: string

    @Field()
    @Column()
    salary: number

    @Field()
    @Column()
    address: string;

    @Field()
    @Column()
    birthday: Date;

    @Field()
    @Column({
        name: 'gender',
        type: 'enum',
        enum: Gender,
    })
    gender: string;

    @Field()
    @Column({
        name: 'role',
        type: 'enum',
        enum: Roles,
        default: Roles.STAFF,
        nullable: false
    })
    role: string;

    @Field()
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