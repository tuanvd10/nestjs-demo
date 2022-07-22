import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("user")
export class UserController {
    // @UseGuards(AuthGuard())
    @Get("me")
    getMe() {
        return "user infomation";
    }
}
