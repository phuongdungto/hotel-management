import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from '../bills/bills.entity';
import { Between, Repository } from 'typeorm';
import { BillsService } from '../bills/bills.service';
import { BillDetail } from '../bill-details/bill-detail.entity';
import { BillStatus } from '../core/enum';
import { statisticsByDayType, statisticsByMonth, statisticsByMonthType, statisticsByTimeRangeType, statisticsByYear, statisticsByYearType, statisticsDayType } from './statistics.types';
import { startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'
import { timeRangeInput } from './statistics.input';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Bill) private billRepo: Repository<Bill>,
        @InjectRepository(BillDetail) private billDetailRepo: Repository<BillDetail>,
        readonly billService: BillsService,
    ) { }

    async statisticsByDay(date: Date): Promise<statisticsByDayType> {
        const { startDate, endDate } = this.get1Day(date);

        const statistics = await this.billRepo
            .createQueryBuilder()
            .select([
                'Bill.id',
                'Bill.totalRental',
                'Bill.totalService',
                'Bill.totalServicePromotion',
                'Bill.totalRoomPromotion',
                // 'SUM(Bill.total_rental+Bill.total_service-Bill.total_service_promotion-Bill.total_room_promotion) as total',
            ])
            .where("Bill.created_at BETWEEN :startDate AND :endDate", { startDate, endDate })
            .getMany();

        let dailyRevenue = 0;
        statistics.forEach((item) => {
            let tmp = item.totalRental + item.totalService - item.totalRoomPromotion - item.totalServicePromotion;
            dailyRevenue += tmp;
            item.total = tmp
        })
        return { bills: statistics as [statisticsDayType], dailyRevenue };
    }

    async statisticsByMonth(input: Date): Promise<statisticsByMonthType> {
        const month = new Date(input);
        const startDate = startOfMonth(month);
        const endDate = endOfMonth(month);
        const statistics = await this.billRepo
            .createQueryBuilder()
            .select([
                'Bill.id',
                'Bill.totalRental',
                'Bill.totalService',
                'Bill.totalServicePromotion',
                'Bill.totalRoomPromotion',
                'Bill.createdAt'
            ])
            .where("Bill.created_at BETWEEN :startDate AND :endDate", { startDate, endDate })
            .orderBy('Bill.created_at', 'ASC')
            .getMany();
        const groupBy = this.groupByMonth(statistics, 'createdAt');
        const keys = Object.keys(groupBy);
        let monthlyRevenue = 0;
        const result = keys.map((item) => {
            let sum = 0;
            groupBy[item].map((item: Bill) => {
                sum += item.totalRental + item.totalService - item.totalRoomPromotion - item.totalServicePromotion;
            })
            monthlyRevenue += sum;
            return {
                date: item,
                revenue: sum
            }
        })
        return { dailyRevenues: result as statisticsByMonth[], monthlyRevenue };
    }

    async statisticsByYear(input: Date): Promise<statisticsByYearType> {
        const yearInput = input.getFullYear()
        const year = new Date(input);
        const startDate = startOfYear(year);
        const endDate = endOfYear(year);
        console.log(startDate, endDate);
        const statistics = await this.billRepo
            .createQueryBuilder()
            .select([
                'Bill.id',
                'Bill.totalRental',
                'Bill.totalService',
                'Bill.totalServicePromotion',
                'Bill.totalRoomPromotion',
                'Bill.createdAt'
            ])
            .where("Bill.created_at BETWEEN :startDate AND :endDate", { startDate, endDate })
            .orderBy('Bill.created_at', 'ASC')
            .getMany();
        const groupBy = this.groupByYear(statistics, 'createdAt');
        let yearlyRevenue = 0;
        const result = Object.keys(groupBy).map((item) => {
            let sum = 0;
            groupBy[item].map((item: Bill) => {
                sum += item.totalRental + item.totalService - item.totalRoomPromotion - item.totalServicePromotion;
            })
            yearlyRevenue += sum;
            return {
                month: `${item}/${yearInput}`,
                monthlyRevenue: sum
            }
        })
        return { monthlyRevenues: result as statisticsByYear[], yearlyRevenue }
    }

    async statisticsByTimeRange(input: timeRangeInput): Promise<statisticsByTimeRangeType> {
        const { startDate } = this.get1Day(input.startDate);
        const { endDate } = this.get1Day(input.endDate);
        const statistics = await this.billRepo
            .createQueryBuilder()
            .select([
                'Bill.id',
                'Bill.totalRental',
                'Bill.totalService',
                'Bill.totalServicePromotion',
                'Bill.totalRoomPromotion',
                'Bill.createdAt'
                // 'SUM(Bill.total_rental+Bill.total_service-Bill.total_service_promotion-Bill.total_room_promotion) as total',
            ])
            .where("Bill.created_at BETWEEN :startDate AND :endDate", { startDate, endDate })
            .getMany();

        console.log(statistics);
        let revenue = 0;
        statistics.forEach((item) => {
            let tmp = item.totalRental + item.totalService - item.totalRoomPromotion - item.totalServicePromotion;
            revenue += tmp;
            item.total = tmp
        })
        return { bills: statistics as [statisticsDayType], revenue };
    }

    get1Day(date: Date) {
        const dateToStatistics = new Date(date);
        const startDate = new Date(dateToStatistics);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(dateToStatistics);
        endDate.setHours(23, 59, 59, 999);
        return {
            startDate,
            endDate
        }
    }
    groupByMonth(xs: any, key: string) {
        return xs.reduce(function (rv, x) {
            (rv[x[key].toLocaleDateString()] = rv[x[key].toLocaleDateString()] || []).push(x);
            return rv;
        }, {});
    };
    groupByYear(xs: any, key: string) {
        return xs.reduce(function (rv, x) {
            (rv[x[key].getMonth()] = rv[x[key].getMonth()] || []).push(x);
            return rv;
        }, {});
    };
}
