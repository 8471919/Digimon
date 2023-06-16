import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AdminSignUpInputDto } from 'src/database/dtos/admin/admin.inbound-port.dto';
import {
  FindAdminInfoForCommonDto,
  FindOneAdminExceptPasswordDto,
} from 'src/database/dtos/admin/admin.outbound-port.dto';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import { AdminController } from 'src/domain/admin/admin.controller';
import { AdminService } from 'src/domain/admin/admin.service';
import typia from 'typia';
import { MockAdminRepository } from './mock/admin.repository.mock';

describe('Admin Spec', () => {
  describe('1. Validate Admin', () => {
    it('1-1. Sign in', async () => {
      const user = typia.random<AdminLogInDto>();

      const authService = new AuthService(
        new MockAdminRepository({}),
        new JwtService({
          secret: 'secret',
        }),
      );
      const authController = new AuthController(authService);

      const res = await authController.adminSignIn(user);

      expect(res.accessToken).toBeDefined();
    });
  });

  describe('2. Read Admin for self', () => {
    it('2-1. 어드민 자신의 정보를 불러옵니다.', async () => {
      const userInfo = typia.random<FindOneAdminExceptPasswordDto>();

      const user: AdminLogInDto = {
        id: userInfo.id,
        email: userInfo.email,
        nickname: userInfo.nickname,
        gradeId: userInfo.gradeId,
      };

      const adminService = new AdminService(
        new MockAdminRepository({ findOneAdminByOptions: [userInfo] }),
      );

      const adminController = new AdminController(adminService);

      const res = await adminController.getAdminInfoForSelf(user, user.id);

      expect(res).toStrictEqual(userInfo);
    });
  });

  describe('3. Update Admin', () => {
    it.todo('3-1. 닉네임을 변경합니다.');
    it.todo('3-2. 비밀번호를 변경합니다.');
    it.todo('3-3. 기타 정보를 변경합니다.');
  });

  describe('4. Read Admin List', () => {
    it.todo('4-1. 어드민 목록을 불러옵니다.');
  });

  describe('5. Read Admin for common user', () => {
    it('5-1. 일반 유저들을 위한 어드민 정보를 불러옵니다.', async () => {
      const admin = typia.random<FindAdminInfoForCommonDto>();

      const adminService = new AdminService(
        new MockAdminRepository({ findOneAdminForCommon: [{ ...admin }] }),
      );

      const adminController = new AdminController(adminService);

      const res = await adminController.getAdminInfoForCommon(admin.id);

      expect(res).toStrictEqual(admin);
    });
  });

  describe('6. Admin Sign up', () => {
    it('6-1. Sign up by Master admin', async () => {
      const master: AdminLogInDto = {
        id: 1,
        email: 'master@gmail.com',
        gradeId: 1,
        nickname: 'king',
      };
      const body = typia.random<AdminSignUpInputDto>();
      const existedAdmin = null;
      const createdAdmin: FindOneAdminExceptPasswordDto = {
        ...body,
        id: 2,
        gradeId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        introduction: null,
        middleName: null,
      };
      const authService = new AuthService(
        new MockAdminRepository({
          findOneAdminForSign: [existedAdmin],
          insertAdmin: [createdAdmin],
        }),
        new JwtService({
          secret: 'secret',
        }),
      );
      const authController = new AuthController(authService);
      const res = await authController.signUpByMaster(master, body);
      expect(res).toStrictEqual(createdAdmin);
    });
  });
});
