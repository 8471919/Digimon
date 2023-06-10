import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  ADMIN_REPOSITORY_OUTBOUND_PORT,
  AdminRepositoryOutboundPort,
} from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';
import {
  AdminJwtDto,
  AdminLogInDto,
} from 'src/database/dtos/auth/admin-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminSignUpInputDto } from 'src/database/dtos/admin/admin.inbound-port.dto';
import { FindOneAdminExceptPasswordDto } from 'src/database/dtos/admin/admin.outbound-port.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ADMIN_REPOSITORY_OUTBOUND_PORT)
    private readonly adminRepo: AdminRepositoryOutboundPort,

    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<AdminLogInDto> {
    const admin = await this.adminRepo.findOneAdminForSign(email);

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

  async adminSignIn(user: AdminLogInDto): Promise<{ accessToken: string }> {
    const payload: Omit<AdminJwtDto, 'iat' | 'exp'> = {
      type: 'admin',
      ...user,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async adminSignUp(
    adminInfo: AdminSignUpInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const existedAdmin = await this.adminRepo.findOneAdminForSign(
      adminInfo.email,
    );

    if (existedAdmin) {
      throw new BadRequestException('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(adminInfo.password, 10);

    adminInfo.password = hashedPassword;

    adminInfo.birth = new Date(adminInfo.birth);

    const createdAdmin = await this.adminRepo.insertAdmin(adminInfo);

    return createdAdmin;
  }
}
