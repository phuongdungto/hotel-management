import { Field, ObjectType } from '@nestjs/graphql';
import { baseEntity } from '../core/extends/base.entity';
import { Rooms } from '../rooms/rooms.entity';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';

@ObjectType()
@Entity('room_style')
export class RoomsStyle extends baseEntity {
    constructor(data?: Partial<RoomsStyle>) {
        super();
        Object.assign(this, data);
    }

    @Field()
    @Column()
    name: string

    @OneToMany(() => Rooms, room => room.roomStyle)
    rooms: Relation<Rooms>[]
}