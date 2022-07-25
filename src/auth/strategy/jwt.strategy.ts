import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: config.get("JWT_SECRET"),
            passReqToCallback: true,
        });
    }

    async validate(@Req() req: Request, payload: any) {
        console.log("token: ", req.headers.authorization);
        const currentUser = await this.prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!currentUser) {
            throw new UnauthorizedException("Unauth");
        }
        delete currentUser.hash;
        return {
            ...currentUser,
            roles: "user",
        }; //add to req.user
    }
}
