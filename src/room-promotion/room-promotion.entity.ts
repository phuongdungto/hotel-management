import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';
import { baseEntity } from '../core/extends/base.entity';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('room_promotions')
export class RoomPromotion extends baseEntity {
    constructor(data?: Partial<RoomPromotion>) {
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

    @Field()
    @Column()
    percent: number;

    @OneToMany(() => RoomPromotionDetails, roomPromotionDetails => roomPromotionDetails.roomPromotion)
    roomPromotionDetails: Relation<RoomPromotionDetails>[]
}