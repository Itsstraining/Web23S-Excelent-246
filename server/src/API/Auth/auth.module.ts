import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema, Auth } from "src/schema/auth.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    ],
    controllers: [

        AuthController
    ],
    providers: [
        AuthService
    ],
})

export class AuthModule { }