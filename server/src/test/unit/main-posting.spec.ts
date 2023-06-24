import { MainPostingService } from 'src/domain/main-posting/main-posting.service';
import { MockMainPostingRepository } from './mock/main-posting.repository.mock';
import { MainPostingController } from 'src/domain/main-posting/main-posting.controller';
import typia from 'typia';
import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';
import { CreateMainPostingInputDto } from 'src/database/dtos/main-posting/main-posting.outbound-port.dto';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';

describe('MainPosting Spec', () => {
  describe('1. Create MainPosting', () => {
    it('1-1. 메인포스팅을 생성합니다.', async () => {
      const user: AdminLogInDto = {
        id: 1,
        gradeId: 1,
        email: 'test@gmail.com',
        nickname: 'sloth',
      };

      const mainPosting = typia.random<MainPostingEntity.MainPosting>();

      const body = typia.random<CreateMainPostingInputDto>();

      const output = { ...mainPosting, ...body };

      const mainPostingService = new MainPostingService(
        new MockMainPostingRepository({
          insertMainPosting: [output],
        }),
      );

      const mainPostingController = new MainPostingController(
        mainPostingService,
      );

      const res = await mainPostingController.createMainPosting(body, user);

      expect(res).toStrictEqual(output);
    });
  });

  describe('2. Read MainPosting', () => {
    it.todo('2-1. 메인포스팅을 상세 내용을 불러옵니다.');
  });

  describe('3. Update MainPosting', () => {
    it.todo('3-1. 메인포스팅을 수정합니다.');
  });

  describe('4. Delete MainPosting', () => {
    it.todo('4-1. 메인포스팅을 삭제합니다.');
  });

  describe('5. Read MainPosting List', () => {
    it.todo('5-1. 메인포스팅 목록을 불러옵니다.');
  });

  describe('6. Read MainPosting and MainPosting Category for Main Page', () => {
    it.todo('6-1. 메인페이지에 들어갈 메인포스팅과 카테고리를 불러옵니다.');
  });
});
