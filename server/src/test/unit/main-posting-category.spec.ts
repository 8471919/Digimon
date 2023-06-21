import { MainPostingCategoryService } from 'src/domain/main-posting-catogory/main-posting-category.service';
import { MockMainPostingCategoryRepository } from './mock/main-posting-category.repository.mock';
import { MainPostingCategoryController } from 'src/domain/main-posting-catogory/main-posting-category.controller';
import typia from 'typia';
import {
  SaveChangesMainPostingCategoryInputDto,
  SaveChangesMainPostingCategoryOutputDto,
} from 'src/database/dtos/main-posting-category/main-posting-category.outbount-port.dto';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';

describe('MainPostingCategory Spec', () => {
  describe('1. Update Category', () => {
    it('1-1. 전체 카테고리를 수정합니다.', async () => {
      const user: AdminLogInDto = {
        id: 1,
        gradeId: 1,
        email: 'test@gmail.com',
        nickname: 'sloth',
      };

      const updateContent =
        typia.random<SaveChangesMainPostingCategoryInputDto>();

      const temp: SaveChangesMainPostingCategoryOutputDto = {
        isCreated: updateContent.create ? true : false,
        isUpdated: updateContent.update ? true : false,
        isDeleted: updateContent.delete ? true : false,
      };

      const mainPostingCategoryService = new MainPostingCategoryService(
        new MockMainPostingCategoryRepository({
          saveChanges: [temp],
        }),
      );

      const mainPostingCategoryController = new MainPostingCategoryController(
        mainPostingCategoryService,
      );

      const res = await mainPostingCategoryController.saveCategoryChanges(
        updateContent,
        user,
      );

      expect(res).toStrictEqual(temp);
    });
  });

  describe('2. Read Category List', () => {
    it.todo('2-1. 카테고리 목록을 불러옵니다.');
  });
});
