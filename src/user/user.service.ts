import { Injectable } from "@nestjs/common"
import { User } from "./user.entity"

@Injectable()
export class UserService {
    
    private users: Array<User> = [{
        id: 1,
        name: "Andrey Krauthein",
        email: "andrey.lemos@hotmail.com.br",
        password: "Ola",
        date: new Date()
    }]
    
    public getOne(name: string): User {
        return this.users.find(user => user.name == name)
    }

    public create(user: User): User {
        this.users.push(user)
        return user
    }

}