import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ManagersService } from '../managers/managers.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly managersService: ManagersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const manager = await this.managersService.findByEmail(dto.email);
    if (!manager) {
      throw new UnauthorizedException('Невалидна е-пошта или лозинка.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, manager.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Невалидна е-пошта или лозинка.');
    }

    const accessToken = await this.jwtService.signAsync(
      { sub: manager.id, email: manager.email },
      { expiresIn: this.config.get<string>('JWT_EXPIRES_IN', '1d') },
    );

    return {
      accessToken,
      manager: { id: manager.id, name: manager.name, email: manager.email },
    };
  }
}
