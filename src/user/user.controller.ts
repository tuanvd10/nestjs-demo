import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { createHttpResonse } from "src/common/HttpResponse";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { Roles } from "src/decorator/roles.decorator";

@Controller("user")
@UseGuards(JwtGuard, RolesGuard) //jwt: named strategy
@Roles("user", "admin")
export class UserController {
    @Get("me")
    getMe(@Req() req: Request) {
        console.log(req.user);
        return createHttpResonse(200, "SUCCESS", req.user);
    }
}
