import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';

@Catch(ApolloError)
export class GraphqlExceptionFilter implements ExceptionFilter {
    catch(exception: ApolloError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();


        response.status(500).json({
            message: exception.message,
        });
    }
}