import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { baseEntity } from '../core/extends/base.entity';
import { ServicePromotionDetails } from '../service-promotion-details/service-promotion-detail.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('service_promotions')
export class ServicePromotion extends baseEntity {
    constructor(data?: Partial<ServicePromotion>) {
        super();
        Object.assign(this, data);
    }

    @Field()
    @Column()
    dateStart: Date;

    @Field()
    @Column()
    dateEnd: Date;

    @Field()
    @Column()
    name: string;

    @OneToMany(() => ServicePromotionDetails, ServicePromotionDetails => ServicePromotionDetails.servicePromotion)
    servicePromotionDetails: Relation<ServicePromotionDetails>[]
}