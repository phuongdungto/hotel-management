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
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('rooms')
export class Rooms extends baseEntity {
    constructor(data?: Partial<Rooms>) {
        super();
        Object.assign(this, data);
    }

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    floor: number

    @Field()
    @Column()
    numberOfPeople: number

    @Field()
    @Column()
    price: number

    @Field()
    @Column({
        name: 'status',
        type: 'enum',
        enum: RoomStatus,
        default: RoomStatus.AVAILABLE,
        nullable: false
    })
    status: string

    @ManyToOne(() => RoomsStyle, roomsStyle => roomsStyle.rooms)
    @JoinColumn()
    roomStyle: Relation<RoomsStyle>

    @Field()
    @Column()
    roomStyleId: string

    @OneToMany(() => RoomReservationDetail, roomReservationDetail => roomReservationDetail.room)
    roomReservationsDetails: Relation<RoomReservationDetail>[]

    @OneToMany(() => RoomPromotionDetails, roomPromotionDetails => roomPromotionDetails.room)
    roomPromotionDetails: Relation<RoomPromotionDetails>[]
}