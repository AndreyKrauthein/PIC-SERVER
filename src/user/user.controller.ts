import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common"
import { NestResponse } from "src/core/http/nest-response"
import { NestResponseBuilder } from "src/core/http/nest-response-builder"
import { User } from "./user.entity"
import { UserService } from "./user.service"

@Controller('users')
export class UserController {

    //inversão de controle
    constructor(private userService: UserService){}

    @Get(':name')
    public getOne(@Param("name") name: string) {
        const user = this.userService.getOne(name)
        return user
    }


    @Post()
    public create(@Body() user: User): NestResponse {
        // 'location','/users/user.name'
        const userCreate = this.userService.create(user)
        return new NestResponseBuilder()
        .comStatus(HttpStatus.CREATED)
        .comHeaders({
            'Location': `/users/${userCreate.name}`
        })
        .comBody(userCreate)
        .build()
    }

}