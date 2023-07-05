import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { baseEntity } from '../core/extends/base.entity';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';
import { ServicerPomotionDetails } from '../service-promotion-details/serivice-promotion-detail.entity';
import { BillDetail } from '../bill-details/bill-detail.entity';

@Entity('service_promotions')
export class ServicePromotion extends baseEntity {
    constructor(data?: Partial<ServicePromotion>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    dateStart: Date;

    @Column()
    dateEnd: Date;

    @Column()
    name: string;

    @OneToMany(() => ServicerPomotionDetails, ServicerPomotionDetails => ServicerPomotionDetails.servicePromotion)
    servicePromotionDetails: Relation<ServicerPomotionDetails>[]

    @OneToMany(() => BillDetail, BillDetail => BillDetail.servicePromotion)
    billDetails: Relation<BillDetail>[]
}