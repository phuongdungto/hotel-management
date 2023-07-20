import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RoomReservationService } from './room-reservation.service';
import { RoomReservation } from './room-reservation.entity';
import { createRoomReservationInput, getRoomReservationsInput, updateRoomReservationInput } from './room-reservation.input';
import { ReqUser } from 'src/users/interfaces/user.interface';
import { UseGuards } from "@nestjs/common/decorators";
import { AuthGuard } from '../auth/auth.guard';
import { RoomReservationDetail } from '../room-reservation-detail/room-reservation-detail.entity';
import { Customer } from '../customers/customers.entity';
import { CustomersService } from 'src/customers/customers.service';
import { getRoomPromotionsType } from '../room-promotion/room-promotion.types';
import { getRoomReservationsTypes } from './room-reservation.types';
import { Bill } from 'src/bills/bills.entity';
import { responseUntil } from 'src/core/utils/response.utils';
import { billType } from '../bills/bills.types';
import { BillsService } from 'src/bills/bills.service';

@Resolver(() => RoomReservation)
export class RoomReservationResolver {
  constructor(
    private roomReservationService: RoomReservationService,
    private customerService: CustomersService,
    private billService: BillsService
  ) { }

  @UseGuards(AuthGuard)
  @Mutation(returns => RoomReservation)
  async createRoomReservation(
    @Args('createRoomReservationInput') input: createRoomReservationInput,
    @Context('user') user: ReqUser
  ): Promise<RoomReservation> {
    const reservation = {
      ...input,
      staffId: user.id
    }
    return await this.roomReservationService.createRoomReservation(reservation);
  }

  @Mutation(returns => RoomReservation)
  async updateRoomReservation(
    @Args('updateRoomReservationInput') input: updateRoomReservationInput
  ): Promise<RoomReservation> {
    return await this.roomReservationService.updateRoomReservation(input)
  }

  @Mutation(returns => responseUntil)
  async deleteRoomReservation(@Args('id') id: string): Promise<responseUntil> {
    await this.roomReservationService.deleteRoomReservation(id)
    return {
      code: "SUCCESS",
      message: "delete Room-Reservation successfull"
    }
  }

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

  @ResolveField(returns => billType, { nullable: true })
  async bill(@Parent() reservation: RoomReservation): Promise<billType> {
    return await this.billService.getbillWithReservation(reservation.billId);
  }
}
