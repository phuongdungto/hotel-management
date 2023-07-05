import { RoomReservationDetail } from '../room-reservation-detail/room-reservation-detail.entity';
import { baseEntity } from '../core/extends/base.entity';
import { RoomStatus } from '../core/enum';
import { RoomsStyle } from '../rooms-style/room-style.entity';
import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    Relation,
    JoinColumn,
} from 'typeorm';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';
import { ServicerPomotionDetails } from '../service-promotion-details/serivice-promotion-detail.entity';
import { BillDetail } from '../bill-details/bill-detail.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('services')
export class Service extends baseEntity {
    constructor(data?: Partial<Service>) {
        super();
        Object.assign(this, data);
    }

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    price: number

    @OneToMany(() => ServicerPomotionDetails, ServicerPomotionDetails => ServicerPomotionDetails.service)
    servicePromotionDetails: Relation<ServicerPomotionDetails>[]

    @OneToMany(() => BillDetail, BillDetail => BillDetail.service)
    billDetails: Relation<BillDetail>[]
}