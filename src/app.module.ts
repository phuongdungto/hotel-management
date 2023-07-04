import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoomsStyleModule } from './rooms-style/room-style.module';
import { RoomsModule } from './rooms/room.module';
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


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => (dataSourceOptions),
      dataSourceFactory: async (options) => {
        const dataSourceInit = await dataSource.initialize();
        return dataSourceInit;
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,

      // formatError: (error: GraphQLError) => {
      //   if (error.message === 'VALIDATION_ERROR') {
      //     const extensions = {
      //       code: 'VALIDATION_ERROR',
      //       errors: [],
      //     };

      //     Object.keys(error.extensions.invalidArgs).forEach((key) => {
      //       const constraints = [];
      //       Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
      //         (_key) => {
      //           constraints.push(
      //             error.extensions.invalidArgs[key].constraints[_key],
      //           );
      //         },
      //       );

      //       extensions.errors.push({
      //         field: error.extensions.invalidArgs[key].property,
      //         errors: constraints,
      //       });
      //     });

      //     const graphQLFormattedError: GraphQLFormattedError = {
      //       message: 'VALIDATION_ERROR',
      //       extensions: extensions,
      //     };

      //     return graphQLFormattedError;
      //   } else {
      //     return error;
      //   }
      // },
      formatError: (err: GraphQLError) => {
        if (err.message.includes('Database Error')) {
          err.message = 'Internal server error'
        }
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
    RoomsStyleModule,
    RoomsModule,
    RoomReservationModule,
    RoomReservationDetailModule,
    RoomPromotionModule,
    RoomPromotionDetailModule,
    AuthModule,
    ProvidersModule,
    GoodsModule,
  ],
  providers: [

  ],
})
export class AppModule { }
