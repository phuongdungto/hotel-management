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

@Entity('room_promotion_details')
export class RoomPromotionDetails {
    constructor(data?: Partial<RoomPromotionDetails>) {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => RoomPromotion, roomPromotion => roomPromotion.roomPromotionDetails)
    @JoinColumn()
    roomPromotion: Relation<RoomPromotion>;

    @Column()
    roomPromotionId: string

    @ManyToOne(() => Rooms, room => room.roomPromotionDetails)
    @JoinColumn()
    room: Relation<Rooms>;

    @Column()
    roomId: string

}