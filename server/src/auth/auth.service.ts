import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  ADMIN_REPOSITORY_OUTBOUND_PORT,
  AdminRepositoryOutboundPort,
} from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';
import bcrypt from 'bcrypt';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import { Admin } from '@prisma/client';
import typia from 'typia';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ADMIN_REPOSITORY_OUTBOUND_PORT)
    private readonly adminRepo: AdminRepositoryOutboundPort,
  ) {}

  async validateAdmin(email: string, password: string): Promise<AdminLogInDto> {
    const admin = await this.adminRepo.findOneAdminForSignUp(email);

    if (!admin) {
      throw new BadRequestException('email is incorrect.');
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('password is incorrect.');
    }

    return {
      id: admin.id,
      email: admin.email,
      nickname: admin.nickname,
      gradeId: admin.genderId,
    } as const;
  }
}
