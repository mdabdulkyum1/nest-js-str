import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name ?? null,
        passwordHash: this.hashPassword(dto.password),
      },
    });
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const hash = this.hashPassword(dto.password);
    if (user.passwordHash !== hash) throw new UnauthorizedException('Invalid credentials');

    // Minimal placeholder token (NOT for production). Replace with JWT.
    const token = crypto.createHash('md5').update(user.id + ':' + Date.now()).digest('hex');
    return { accessToken: token };
  }
}

