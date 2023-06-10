import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AdminSignUpInputDto } from 'src/database/dtos/admin/admin.inbound-port.dto';
import { FindOneAdminExceptPasswordDto } from 'src/database/dtos/admin/admin.outbound-port.dto';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import { AdminRepositoryOutboundPort } from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';
import typia from 'typia';

/**
 * 동일한 repository 함수를 두 번 호출할 경우, 결과 값을 1개만 쓸수 밖에 없다는 단점이 있다.
 * 그래서 차라리 Array형식으로 만들어서 함수 호출할 때 마다, pop을 하는 형식으로 하도록 만들었다.
 * 어차피, pop으로 변수에 한 번 할당하면, 해당 변수를 이용해서 동일한 값을 재사용 할 수 있으니까.
 */
type MockAdminRepositoryParamType = {
  insertAdmin?: Array<FindOneAdminExceptPasswordDto>;
  findOneAdminForSign?: Array<Admin | null>;
  findOneAdminByOptions?: Array<FindOneAdminExceptPasswordDto | null>;
};

class MockAdminRepository implements AdminRepositoryOutboundPort {
  private readonly result: MockAdminRepositoryParamType;

  constructor(result: MockAdminRepositoryParamType) {
    this.result = result;
  }

  async insertAdmin(
    adminInfo: AdminSignUpInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const res = this.result.insertAdmin?.pop();
    if (!res && res !== null) {
      throw new Error('undefined');
    }

    return res;
  }
  async findOneAdminForSign(email: string): Promise<Admin | null> {
    const res = this.result.findOneAdminForSign?.pop();
    if (!res && res !== null) {
      throw new Error('undefined');
    }

    return res;
  }
  async findOneAdminByOptions(
    options: Partial<Pick<Admin, 'id' | 'email' | 'nickname' | 'gradeId'>>,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const res = this.result.findOneAdminByOptions?.pop();
    if (!res && res !== null) {
      throw new Error('undefined');
    }

    return res;
  }
}

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
    it.todo('2-1. 어드민 자신의 정보를 불러옵니다.');
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
    it.todo('5-1. 일반 유저들을 위한 어드민 정보를 불러옵니다.');
  });

  describe('6. Admin Sign up', () => {
    it('6-1. Sign up by Master admin', async () => {
      const user: AdminLogInDto = {
        id: 1,
        email: 'master@gmail.com',
        gradeId: 1,
        nickname: 'king',
      };

      const body: AdminSignUpInputDto = typia.random<AdminSignUpInputDto>();

      const existedAdmin = null;

      const createdAdmin: FindOneAdminExceptPasswordDto = {
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 2,
        deletedAt: null,
        introduction: null,
        middleName: null,
        birth: new Date(),
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
      const res = await authController.signUpByMaster(user, body);

      expect(res).toStrictEqual(createdAdmin);
    });
  });
});
