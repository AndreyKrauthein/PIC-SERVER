import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";

@Catch()
export class ExceptionFilterHttp implements ExceptionFilter {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        //representaçao do express ou do fastfy
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: Error, host: ArgumentsHost) {
        const  context = host.switchToHttp();
        const require = context.getRequest();
        const response = context.getResponse()

        const { status, body } = exception instanceof HttpException
            //if ternario
            ? {
                status: exception.getStatus(),
                body: exception.getResponse(),
            }
            : {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toISOString(),
                    message: exception.message,
                    path: require.path
                }
            }
        //vai construir a resposta pro usuario
        this.httpAdapter.reply(response, body, status)     
    }

}