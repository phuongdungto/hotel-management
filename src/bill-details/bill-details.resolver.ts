import { Resolver } from '@nestjs/graphql';
import { BillDetail } from './bill-detail.entity';

@Resolver(() => BillDetail)
export class BillDetailsResolver {

}
