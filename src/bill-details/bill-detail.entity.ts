import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { baseEntity } from '../core/entities/base.entity';
import { Roles } from '../core/enum';
import {
    Entity,
    Column,
    Relation,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
} from 'typeorm';
import { Bill } from '../bills/bills.entity';
import { Service } from '../services/service.entity';
import { ServicePromotion } from '../service-promotion/service-promotion.entity';

@Entity('bill_details')
export class BillDetail {
    constructor(data: Partial<BillDetail>) {
        Object.assign(this, data);
    }

    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column()
    price: number

    @Column()
    numberOfServices: number

    @Column()
    totalPrice: number

    @Column()
    promotionPrice: number

    @ManyToOne(() => Bill, Bill => Bill.billDetails)
    @JoinColumn()
    bill: Relation<Bill>;

    @Column()
    billId: string

    @ManyToOne(() => Service, Service => Service.billDetails)
    @JoinColumn()
    service: Relation<Service>;

    @Column()
    serviceId: string

    @ManyToOne(() => ServicePromotion, ServicePromotion => ServicePromotion.billDetails)
    @JoinColumn()
    servicePromotion: Relation<ServicePromotion>;

    @Column()
    servicePromotionId: string
}