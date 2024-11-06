import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interface/jwt.payload.interface';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: Partial<AuthCredentialsDto>,
  ): Promise<{ accessToken: string }> {
    let user: User;
    const { nick, email, password } = authCredentialsDto;
    if (nick) {
      user = await this.usersRepository.findOneBy({ nick });
    }
    if (email) {
      user = await this.usersRepository.findOneBy({ email });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(this.jwtService);
      const payload: JwtPayloadInterface = { nick };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
