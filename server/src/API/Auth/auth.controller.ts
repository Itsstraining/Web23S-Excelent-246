import { Body, Controller, Post, Get, Put } from '@nestjs/common';
import { AuthModel } from 'src/Models/auth.model';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }
    // /auth/sign-in
    @Post('sign-in')
    async signIn(@Body() user: AuthModel) {
        let temp = await this.authService.findUserById(user.userId);
        // console.log(temp);
        if (temp != null) {
            return 'User already exists';
        } else {
            return this.authService.signIn(user)
        }
    }
    @Get('getId')
    getId(@Body() user: AuthModel) {
        return this.authService.findUserById(user.userId);
    }
    @Post('sign-up')
    signUp() {
        return this.authService.signUp();
    }

    @Get('getAllUsers')
    getAllUsers() {
        return this.authService.getAllUsers();
    }
}