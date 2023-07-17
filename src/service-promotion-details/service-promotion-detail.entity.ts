import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    Relation,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ServicePromotion } from '../service-promotion/service-promotion.entity';
import { Service } from '../services/service.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('service_promotion_details')
export class ServicePromotionDetails {
    constructor(data?: Partial<ServicePromotionDetails>) {
        Object.assign(this, data);
    }

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    percent: number;

    @ManyToOne(() => ServicePromotion, ServicePromotion => ServicePromotion.servicePromotionDetails)
    @JoinColumn()
    servicePromotion: Relation<ServicePromotion>;

    @Field()
    @Column()
    servicePromotionId: string

    @ManyToOne(() => Service, service => service.servicePromotionDetails)
    @JoinColumn()
    service: Relation<Service>;

    @Field()
    @Column()
    serviceId: string

    @Field()
    @Column()
    dateStart: Date;

    @Field()
    @Column()
    dateEnd: Date;
}