import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { createCustomerIput, getCustomersInput, updateCustomerInput } from './customers.input';
import { Customer } from './customers.entity';
import { getCustomersType } from './customers.types';
import { responseUntil } from '../core/utils/response.utils';
import { RoomReservation } from '../room-reservation/room-reservation.entity';

@Resolver(() => Customer)
export class CustomersResolver {
    constructor(
        private customerService: CustomersService
    ) {
    }

    @Mutation(returns => Customer)
    async createCustomer(@Args('createCustomerInput') input: createCustomerIput): Promise<Customer> {
        return await this.customerService.createCustomer(input);
    }

    @Mutation(returns => Customer)
    async updateCustomer(@Args('updareCustomerInput') input: updateCustomerInput): Promise<Customer> {
        return await this.customerService.updateCustomer(input)
    }

    @Mutation(returns => responseUntil)
    async deleteCustomer(@Args('id') id: string): Promise<responseUntil> {
        await this.deleteCustomer(id);
        return {
            code: "SUCCESS",
            message: "deleted customer successfull",
        }
    }

    @Query(returns => Customer)
    async getCustomer(@Args('id') id: string): Promise<Customer> {
        return await this.customerService.getCustomer(id);
    }

    @Query(returns => getCustomersType)
    async getCustomers(@Args('getCustomersInput') input: getCustomersInput): Promise<getCustomersType> {
        return await this.customerService.getCustomers(input);
    }

    @ResolveField(() => [RoomReservation])
    async roomReservations(@Parent() customer: Customer): Promise<RoomReservation[]> {
        return await this.customerService.getReservationWithCustomerId(customer.id);
    }
}
