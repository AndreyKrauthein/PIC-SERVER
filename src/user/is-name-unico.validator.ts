import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "./user.service";

@Injectable()
@ValidatorConstraint()
export class IsNameUnicoConstraint implements ValidatorConstraintInterface {
    //para usar injeçao de dependencia tem que ver o main
    constructor (private usuarioService: UserService) {}

    validate(name: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return !!!this.usuarioService.getOne(name)
    }
}


export function IsNameUnico(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsNameUnicoConstraint,
      });
    };
}