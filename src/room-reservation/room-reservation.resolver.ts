import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RoomReservationService } from './room-reservation.service';
import { RoomReservation } from './room-reservation.entity';
import { createRoomReservationInput, getRoomReservationsInput } from './room-reservation.input';
import { ReqUser } from 'src/users/interfaces/user.interface';
import { UseGuards } from "@nestjs/common/decorators";
import { AuthGuard } from '../auth/auth.guard';
import { RoomReservationDetail } from 'src/room-reservation-detail/room-reservation-detail.entity';
import { Customer } from '../customers/customers.entity';
import { CustomersService } from 'src/customers/customers.service';
import { getRoomPromotionsType } from 'src/room-promotion/room-promotion.types';
import { getRoomReservationsTypes } from './room-reservation.types';

@Resolver(() => RoomReservation)
export class RoomReservationResolver {
  constructor(
    private roomReservationService: RoomReservationService,
    private customerService: CustomersService
  ) { }

  @UseGuards(AuthGuard)
  @Mutation(returns => RoomReservation)
  async createRoomReservation(
    @Args('createRoomReservationInput') input: createRoomReservationInput,
    @Context('user') user: ReqUser
  ) {
    const reservation = {
      ...input,
      staffId: user.id
    }
    return await this.roomReservationService.createRoomReservation(reservation);
  }

  // async updateRoomReservation(
  //     @Args('updateRoomReservationInput') input,
  // ) {

  // }

  // @Resolver(() => Bill)
  // async Bill(@Parent()roomReservation: RoomReservation): Promise<Bill> {

  // }

  @Query(returns => RoomReservation)
  async getRoomReservation(@Args('id') id: string): Promise<RoomReservation> {
    return this.roomReservationService.getRoomReservation(id);
  }

  @Query(returns => getRoomReservationsTypes)
  async getRoomReservations(@Args('getRoomReservationsInput') input: getRoomReservationsInput): Promise<getRoomReservationsTypes> {
    return this.roomReservationService.getRoomReservations(input);
  }

  @ResolveField(() => [RoomReservationDetail])
  async roomReservationDetails(@Parent() roomReservation: RoomReservation): Promise<RoomReservationDetail[]> {
    return await this.roomReservationService.getRoomReservationDetails(roomReservation.id);
  }

  @ResolveField(() => Customer)
  async customer(@Parent() roomReservation: RoomReservation): Promise<RoomReservationDetail[]> {
    return await this.customerService.getCustomerWithReservationId(roomReservation.customerId);
  }
}
