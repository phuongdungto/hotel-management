import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Bill } from './bills.entity';
import { BillsService } from './bills.service';
import { billType, getBillsType } from './bills.types';
import { checkOutInput, getBillsInput, updateBillInput } from './bills.input';
import { Customer } from '../customers/customers.entity';
import { CustomersService } from '../customers/customers.service';
import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { RoomReservationService } from '../room-reservation/room-reservation.service';

@Resolver(() => billType)
export class BillsResolver {
    constructor(
        private billService: BillsService,
        private customerService: CustomersService,
        private reservationService: RoomReservationService
    ) { }

    @Query(returns => billType)
    async getBill(@Args('id') id: string): Promise<billType> {
        return await this.billService.getBill(id)
    }

    @Query(returns => getBillsType)
    async getBills(@Args('getBillsInput') input: getBillsInput): Promise<getBillsType> {
        return await this.billService.getBills(input)
    }

    @Mutation(returns => Bill)
    async createBill(@Args('reservationId') reservationId: string): Promise<Bill> {
        return await this.billService.createBill(reservationId);
    }

    @Mutation(returns => billType)
    async updateBill(@Args('updateBillInput') input: updateBillInput): Promise<billType> {
        return await this.billService.updateBill(input);
    }

    @Mutation(returns => billType)
    async checkOut(@Args('id') id: string): Promise<billType> {
        return await this.billService.checkOut(id);
    }

    @ResolveField(returns => Customer, { nullable: true })
    async customer(@Parent() bill: Bill): Promise<Customer> {
        return await this.customerService.getCustomerWithReservationId(bill.customerId);
    }
}
