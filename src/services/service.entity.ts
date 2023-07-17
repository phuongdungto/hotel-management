import { baseEntity } from '../core/extends/base.entity';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { ServicePromotionDetails } from '../service-promotion-details/service-promotion-detail.entity';
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

    @OneToMany(() => ServicePromotionDetails, ServicerPomotionDetails => ServicerPomotionDetails.service)
    servicePromotionDetails: Relation<ServicePromotionDetails>[]

    @OneToMany(() => BillDetail, BillDetail => BillDetail.service)
    billDetails: Relation<BillDetail>[]
}