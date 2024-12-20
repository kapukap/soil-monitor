import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private userService: AuthService) {}

  @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string, authId: string }> {
        return this.userService.signUp(authCredentialsDto);
    }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string, authId: string }> {
      return this.userService.signIn(authCredentialsDto);
  }
}
