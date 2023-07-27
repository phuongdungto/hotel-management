import { Args, Query, Resolver } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { statisticsByDayType, statisticsByMonthType, statisticsByTimeRangeType, statisticsByYearType } from './statistics.types';
import { timeRangeInput } from './statistics.input';

@Resolver()
export class StatisticsResolver {
    constructor(
        private statisticsService: StatisticsService
    ) { }

    @Query(returns => statisticsByDayType)
    async statisticsByDay(@Args('dateInput') input: Date) {
        return await this.statisticsService.statisticsByDay(input);
    }

    @Query(returns => statisticsByMonthType)
    async statisticsByMonth(@Args('monthInput') input: Date): Promise<statisticsByMonthType> {
        return await this.statisticsService.statisticsByMonth(input);
    }

    @Query(returns => statisticsByYearType)
    async statisticsByYear(@Args('yearInput') input: Date) {
        return await this.statisticsService.statisticsByYear(input);
    }

    @Query(returns => statisticsByTimeRangeType)
    async statisticsByTimeRange(@Args('timeRangeInput') input: timeRangeInput): Promise<statisticsByTimeRangeType> {
        return await this.statisticsService.statisticsByTimeRange(input)
    }
}
