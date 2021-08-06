import { Module } from '@nestjs/common';
import { IsNameUnicoConstraint } from './is-name-unico.validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, IsNameUnicoConstraint],
})
export class UserModule {}

//módulo serve para organizar as classes