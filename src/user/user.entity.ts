import { Exclude } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { IsNameUnico } from "./is-name-unico.validator"

export class User {
    //npm i class-transformer@0.2.3 class-validator@0.12.2

    id: number

    @IsNameUnico({
        message: "Usuario já cadastrado!"
    })
    @IsNotEmpty({
        message: "O nome é obrigatório!"
    })
    @IsString()
    name: string

    @IsNotEmpty({
        message: "O email é obrigatório!"
    })
    @IsEmail()
    email: string

    //nao retorna o password, proteçao (serelização)
    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty({
        message: "A senha é obrigatório!"
    })
    password: string


    date: Date
}

