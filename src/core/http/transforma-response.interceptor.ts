import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { response } from "express";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { NestResponse } from "./nest-response";

@Injectable()
export class TransformaResponseInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                map( (responseDoController: NestResponse) => {
                    if (responseDoController instanceof NestResponse) {
                        const contexto = context.switchToHttp();
                        const response = contexto.getResponse();
                        const {headers, status, body} = responseDoController;

                        const namesDosHeaders = Object.getOwnPropertyNames(headers);
                        namesDosHeaders.forEach(namesDosHeaders => {
                            const valorDoHeader = headers[namesDosHeaders]
                            
                        })
                    }

                    return responseDoController
                })
            ); 
    }

}