import { IsString } from "class-validator"
import { Type } from "class-transformer"

export class LoginDto {
    @Type(() => String)
    @IsString()
    username: string

    @Type(() => String)
    @IsString()
    password: string
}