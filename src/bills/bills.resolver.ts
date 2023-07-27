import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Bill } from './bills.entity';
import { BillsService } from './bills.service';
import { billType, getBillsType } from './bills.types';
import { checkOutInput, createBillInput, getBillsInput, updateBillInput } from './bills.input';
import { Customer } from '../customers/customers.entity';
import { CustomersService } from '../customers/customers.service';
import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { RoomReservationService } from '../room-reservation/room-reservation.service';
import { BillDetail } from 'src/bill-details/bill-detail.entity';

@Resolver(() => Bill)
export class BillsResolver {
    constructor(
        private billService: BillsService,
        private customerService: CustomersService,
        private reservationService: RoomReservationService
    ) { }

    @Query(returns => Bill)
    async getBill(@Args('id') id: string): Promise<Bill> {
        return await this.billService.getBill(id)
    }

    @Query(returns => getBillsType)
    async getBills(@Args('getBillsInput') input: getBillsInput): Promise<getBillsType> {
        return await this.billService.getBills(input)
    }

    @Mutation(returns => Bill)
    async createBill(@Args('createBillInput') input: createBillInput): Promise<Bill> {
        return await this.billService.createBill(input);
    }

    @Mutation(returns => Bill)
    async updateBill(@Args('updateBillInput') input: updateBillInput): Promise<Bill> {
        return await this.billService.updateBill(input);
    }

    @Mutation(returns => Bill)
    async checkOut(@Args('id') id: string): Promise<Bill> {
        return await this.billService.checkOut(id);
    }

    @ResolveField(returns => Customer, { nullable: true })
    async customer(@Parent() bill: Bill): Promise<Customer> {
        return await this.customerService.getCustomerWithReservationId(bill.customerId);
    }

    @ResolveField(returns => [BillDetail], { nullable: true })
    async billDetails(@Parent() bill: Bill): Promise<BillDetail[]> {
        return await this.billService.getbillDetailsWithBill(bill.id);
    }

    @ResolveField(returns => RoomReservation, { nullable: true })
    async roomReservation(@Parent() bill: Bill): Promise<RoomReservation> {
        return await this.reservationService.getReservationWithReservationDetails(bill.roomReservationId);
    }
}
