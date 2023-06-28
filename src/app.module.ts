import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { RoomsStyleModule } from './rooms-style/room-style.module';
import { RoomsModule } from './rooms/room.module';
import { CustomersModule } from './customers/customer.module';
import { RoomReservationModule } from './room-reservation/room-reservation.module';
import { RoomReservationDetailModule } from './room-reservation-detail/room-reservation-detail.module';
import { RoomPromotionModule } from './room-promotion/room-promotion.module';
import { dataSourceOptions } from './core/db/data-source';
import { DataSource } from 'typeorm';
import { RoomPromotionDetailModule } from './room-promotion-detail/room-promotion-detail.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    UsersModule,
    RoomsStyleModule,
    RoomsModule,
    CustomersModule,
    RoomReservationModule,
    RoomReservationDetailModule,
    RoomPromotionModule,
    RoomPromotionDetailModule
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
