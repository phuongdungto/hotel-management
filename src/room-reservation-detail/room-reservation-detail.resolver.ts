import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { RoomReservationDetail } from './room-reservation-detail.entity';
import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { RoomReservationService } from '../room-reservation/room-reservation.service';
import { Rooms } from '../rooms/rooms.entity';
import { RoomsService } from '../rooms/rooms.service';

@Resolver(() => RoomReservationDetail)
export class RoomReservationDetailResolver {
    constructor(
        private roomReservationService: RoomReservationService,
        private roomService: RoomsService
    ) { }

    @ResolveField(() => RoomReservation)
    async roomReservations(@Parent() roomReservationsDetails: RoomReservationDetail) {
        return await this.roomReservationService.getReservationWithReservationDetails(roomReservationsDetails.roomReservationId);
    }

    @ResolveField(() => Rooms)
    async rooms(@Parent() roomReservationDetails: RoomReservationDetail) {
        return await this.roomService.getRoomWithPromotionDetails(roomReservationDetails.roomId)
    }
}
