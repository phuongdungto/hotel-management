import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BillDetail } from './bill-detail.entity';
import { Service } from '../services/service.entity';
import { ServicesService } from '../services/services.service';
import { serviceType } from '../services/services.types';

@Resolver(() => BillDetail)
export class BillDetailsResolver {
    constructor(
        private serviceService: ServicesService
    ) { }

    @ResolveField(() => serviceType)
    async service(@Parent() billDetail: BillDetail) {
        return await this.serviceService.getService(billDetail.serviceId);
    }
}
