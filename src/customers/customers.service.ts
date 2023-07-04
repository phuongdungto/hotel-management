import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customers.entity';
import { Not, Repository } from 'typeorm';
import { createCustomerIput, getCustomersInput, updateCustomerInput } from './customers.input';
import { getCustomersType } from './customers.types';
import { BuildPagination } from '../core/utils/pagination.utils';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer) private customerRepo: Repository<Customer>
    ) {

    }

    async createCustomer(input: createCustomerIput): Promise<Customer> {
        const exist = await this.customerRepo.findOneBy({ nationalId: input.nationalId })
        if (exist) {
            throw new BadRequestException("Customer already exists");
        }

        return await this.customerRepo.save(input);
    }

    async updateCustomer(id: string, input: updateCustomerInput): Promise<Customer> {
        const customer = await this.customerRepo.findOneBy({ id });
        const exists = await this.customerRepo.findOneBy({ nationalId: input.nationalId })
        if (!customer) {
            throw new BadRequestException("Customer not found")
        }
        if (exists) {
            throw new BadRequestException("NationalId already exists")
        }
        Object.assign(customer, input);
        return await this.customerRepo.save(customer);
    }

    async getCustomer(id: string): Promise<Customer> {
        const customer = await this.customerRepo.findOneBy({ id });
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        return customer;
    }

    async getCustomers(input: getCustomersInput): Promise<getCustomersType> {
        const query = BuildPagination(Customer, input);
        const [customers, total] = await this.customerRepo.findAndCount({
            ...query
        });
        return { totalPage: Math.ceil(total / input.limit), customers: customers }
    }

    async deleteCustomer(id: string) {
        const customer = await this.customerRepo.findOneBy({ id });
        if (!customer) {
            throw new NotFoundException("Customer not found")
        }
        await this.customerRepo.softDelete(id);
    }
}
