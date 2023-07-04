import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { createCustomerIput, getCustomersInput, updateCustomerInput } from './customers.input';
import { Customer } from './customers.entity';
import { customerType, getCustomersType } from './customers.types';
import { responseUntil } from 'src/core/utils/response.utils';

@Resolver()
export class CustomersResolver {
    constructor(
        private customerService: CustomersService
    ) {
    }

    @Mutation(returns => customerType)
    async createCustomer(@Args('createCustomerInput') input: createCustomerIput): Promise<Customer> {
        return await this.customerService.createCustomer(input);
    }

    @Mutation(returns => customerType)
    async updateCustomer(@Args('id') id: string, @Args('updareCustomerInput') input: updateCustomerInput): Promise<Customer> {
        return await this.customerService.updateCustomer(id, input)
    }

    @Mutation(returns => responseUntil)
    async deleteCustomer(@Args('id') id: string): Promise<responseUntil> {
        await this.deleteCustomer(id);
        return {
            code: "SUCCESS",
            message: "deleted customer successfull",
        }
    }

    @Query(returns => customerType)
    async getCustomer(@Args('id') id: string): Promise<Customer> {
        return await this.customerService.getCustomer(id);
    }

    @Query(returns => getCustomersType)
    async getCustomers(@Args('getCustomersInput') input: getCustomersInput): Promise<getCustomersType> {
        return await this.customerService.getCustomers(input);
    }
}
