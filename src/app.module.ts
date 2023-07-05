import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './rooms/rooms.module';
import { CustomersModule } from './customers/customers.module';
import { RoomReservationModule } from './room-reservation/room-reservation.module';
import { RoomReservationDetailModule } from './room-reservation-detail/room-reservation-detail.module';
import { RoomPromotionModule } from './room-promotion/room-promotion.module';
import { RoomPromotionDetailModule } from './room-promotion-detail/room-promotion-detail.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AuthModule } from './auth/auth.module';
// import { DatabaseModule } from './database/database.module';
import dataSource, { dataSourceOptions } from './core/db/data-source';
import { ProvidersModule } from './providers/providers.module';
import { GoodsModule } from './goods/goods.module';
import { RoomsStyleModule } from './rooms-style/rooms-style.module';
import { ServicesModule } from './services/services.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => (dataSourceOptions),
      dataSourceFactory: async () => {
        const dataSourceInit = await dataSource.initialize();
        return dataSourceInit;
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      formatError: (err: GraphQLError) => {
        const { code, originalError, stacktrace } = err.extensions;
        return {
          message: err.message,
          extensions: {
            code: code,
            originalErrorr: originalError,
            stacktrace: process.env.NODE_ENV === 'production' ? undefined : stacktrace
          },
        }
      }
    }),
    UsersModule,
    CustomersModule,
    RoomsModule,
    RoomReservationModule,
    RoomReservationDetailModule,
    RoomPromotionModule,
    RoomPromotionDetailModule,
    AuthModule,
    ProvidersModule,
    GoodsModule,
    RoomsStyleModule,
    ServicesModule
  ],
  providers: [

  ],
})
export class AppModule { }
