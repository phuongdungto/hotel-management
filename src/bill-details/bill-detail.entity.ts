import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/extends/base.entity';
import { Roles } from '../core/enum';
import {
    Entity,
    Column,
    Relation,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from '../bills/bills.entity';
import { Service } from '../services/service.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('bill_details')
export class BillDetail {
    constructor(data?: Partial<BillDetail>) {
        Object.assign(this, data);
    }

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    quantity: number

    @ManyToOne(() => Bill, Bill => Bill.billDetails)
    @JoinColumn()
    bill: Relation<Bill>;

    @Field()
    @Column()
    billId: string

    @ManyToOne(() => Service, Service => Service.billDetails)
    @JoinColumn()
    service: Relation<Service>;

    @Field()
    @Column()
    serviceId: string
}