import {
    Entity,
    ManyToOne,
    JoinColumn,
    Relation,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Rooms } from '../rooms/rooms.entity';
import { RoomPromotion } from '../room-promotion/room-promotion.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('room_promotion_details')
export class RoomPromotionDetails {
    constructor(data?: Partial<RoomPromotionDetails>) {
        Object.assign(this, data);
    }

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => RoomPromotion, roomPromotion => roomPromotion.roomPromotionDetails)
    @JoinColumn()
    roomPromotion: Relation<RoomPromotion>;

    @Field()
    @Column()
    roomPromotionId: string

    @ManyToOne(() => Rooms, room => room.roomPromotionDetails)
    @JoinColumn()
    room: Relation<Rooms>;

    @Field()
    @Column()
    roomId: string

    @Field()
    @Column()
    dateStart: Date;

    @Field()
    @Column()
    dateEnd: Date;

}