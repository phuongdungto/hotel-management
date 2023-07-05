import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    Relation,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Rooms } from '../rooms/rooms.entity';
import { RoomPromotion } from '../room-promotion/room-promotion.entity';
import { ServicePromotion } from '../service-promotion/service-promotion.entity';
import { Service } from '../services/service.entity';

@Entity('service_promotion_details')
export class ServicerPomotionDetails {
    constructor(data?: Partial<ServicerPomotionDetails>) {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    percent: number;

    @ManyToOne(() => ServicePromotion, ServicePromotion => ServicePromotion.servicePromotionDetails)
    @JoinColumn()
    servicePromotion: Relation<ServicePromotion>;

    @Column()
    servicePromotionId: string

    @ManyToOne(() => Service, service => service.servicePromotionDetails)
    @JoinColumn()
    service: Relation<Service>;

    @Column()
    serviceId: string
}