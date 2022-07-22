import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createHttpResonse } from "src/common/HttpResponse";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}
    test = () => console.log(process.env.DATABASE_URL);
    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user || user.hash !== dto.password)
            throw new ForbiddenException({
                error_code: 403000,
                message: "Creditenal incorrect",
            });
        delete user.hash;
        return createHttpResonse(200, "SUCCESS", user);
    }
    async signup(dto: AuthDto) {
        //hash PW
        dto.password;
        //save to db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: dto.password,
                },
                select: {
                    id: true,
                },
            });
            //return data
            return createHttpResonse(200, "SUCCESS", user);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    //duplicate
                    throw new ForbiddenException("contrains error");
                }
            }
        }
    }
}
