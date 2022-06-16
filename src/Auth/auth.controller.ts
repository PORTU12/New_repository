import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserSubscribeDto } from '../Auth/UserSubscribe.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './LoginCredentialsDto';

@ApiTags('Authentification')
@Controller('users')
export class AuthController {
    constructor(private authservice: AuthService) { }

    @Post('register')
    //@ApiCreatedResponse({ description: 'User Register' })
    register(
        @Body() userData: UserSubscribeDto
    ): Promise<UserEntity> {
        return this.authservice.subscribe(userData)
    }
    @Post('login')
    //@ApiCreatedResponse({ description: 'User Login' })
    ModifUserlogin(
        @Body() userData: LoginCredentialsDto
    ) {
        return this.authservice.Login(userData)
    }
}
