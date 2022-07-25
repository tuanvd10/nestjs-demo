import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const classRoles = this.reflector.get<string[]>(
            "roles",
            context.getClass()
        );
        if (classRoles) {
            if (!classRoles.includes(user.roles))
                throw new HttpException(
                    "Unauthorized access",
                    HttpStatus.BAD_REQUEST
                );
        }

        const handlerRoles = this.reflector.get<string[]>(
            "roles",
            context.getHandler()
        );
        if (handlerRoles) {
            if (!handlerRoles.includes(user.roles))
                throw new HttpException(
                    "Unauthorized access",
                    HttpStatus.BAD_REQUEST
                );
        }
        return true;
    }
}
