import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionFilterHttp } from './common/filter/exception-filter-http.filter';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      //interceptador enviar senha mas nao retornar esse dado sensível
      provide:APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      //usando o filtro de exceçao
      provide: APP_FILTER,
      useClass: ExceptionFilterHttp
    }
  ],
})
export class AppModule {}

//módulo serve para organizar as classes