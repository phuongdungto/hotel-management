import { Resolver } from '@nestjs/graphql';
import { Bill } from './bills.entity';
import { BillsService } from './bills.service';

@Resolver(()=> Bill)
export class BillsResolver {
    constructor(
        private billService : BillsService
    ){}
}
