import { baseEntity } from '../core/entities/base.entity';
import { Rooms } from '../rooms/room.entity';
import {
    Entity,
    Column,
    OneToMany,
    Relation,
} from 'typeorm';

@Entity('room_style')
export class RoomsStyle extends baseEntity {
    constructor(data: Partial<RoomsStyle>) {
        super();
        Object.assign(this, data);
    }

    @Column()
    name: string

    @OneToMany(() => Rooms, room => room.roomStyle)
    rooms: Relation<Rooms>[]
}