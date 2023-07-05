import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { baseEntity } from '../core/extends/base.entity';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';

@Entity('room_promotions')
export class RoomPromotion extends baseEntity {
    constructor(data?: Partial<RoomPromotion>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    dateStart: Date;

    @Column()
    dateEnd: Date;

    @Column()
    name: string;

    @Column()
    percent: number;

    @OneToMany(() => RoomPromotionDetails, roomPromotionDetails => roomPromotionDetails.roomPromotion)
    roomPromotionDetails: Relation<RoomPromotionDetails>[]
}