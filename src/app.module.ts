import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoomsStyleModule } from './rooms-style/room-style.module';
import { RoomsModule } from './rooms/room.module';
import { CustomersModule } from './customers/customer.module';
import { RoomReservationModule } from './room-reservation/room-reservation.module';
import { RoomReservationDetailModule } from './room-reservation-detail/room-reservation-detail.module';
import { RoomPromotionModule } from './room-promotion/room-promotion.module';
import { dataSourceOptions } from './core/db/data-source';
import { RoomPromotionDetailModule } from './room-promotion-detail/room-promotion-detail.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { Context } from './types/express/context';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: ({ req, res }): Pick<Context, 'req' | 'res'> => ({ req, res }),
      formatError: (error: GraphQLError) => {
        if (error.message === 'VALIDATION_ERROR') {
          const extensions = {
            code: 'VALIDATION_ERROR',
            errors: [],
          };

          Object.keys(error.extensions.invalidArgs).forEach((key) => {
            const constraints = [];
            Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
              (_key) => {
                constraints.push(
                  error.extensions.invalidArgs[key].constraints[_key],
                );
              },
            );

            extensions.errors.push({
              field: error.extensions.invalidArgs[key].property,
              errors: constraints,
            });
          });

          const graphQLFormattedError: GraphQLFormattedError = {
            message: 'VALIDATION_ERROR',
            extensions: extensions,
          };

          return graphQLFormattedError;
        } else {
          return error;
        }
      },
    }),
    UsersModule,
    RoomsStyleModule,
    RoomsModule,
    CustomersModule,
    RoomReservationModule,
    RoomReservationDetailModule,
    RoomPromotionModule,
    RoomPromotionDetailModule,
    AuthModule
  ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: GraphqlExceptionFilter,
  //   },
  // ],
})
export class AppModule { }
