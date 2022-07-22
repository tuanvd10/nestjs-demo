import { Injectable } from "@nestjs/common"
import { createHttpResonse } from "src/common/HttpResponse"

@Injectable({})
export class AuthService {
    test = () => console.log("Test from AuthService")
    signin() {
        return createHttpResonse(200, "SUCCESS", "signup function")
    }
    signup() {
        return createHttpResonse(200, "SUCCESS", "signup function")
    }
}
