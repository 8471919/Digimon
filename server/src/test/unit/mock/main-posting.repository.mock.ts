import { IsDeletedOutputDto } from 'src/database/dtos/common/crud-bool.dto';
import {
  CreateMainPostingInputDto,
  FindMainPostingListOptionsForPagenationDto,
  FindMainPostingListOutputDto,
  FindMainPostingOptionsDto,
} from 'src/database/dtos/main-posting/main-posting.outbound-port.dto';
import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';
import { MainPostingRepositoryOutboundPort } from 'src/database/repositories/outbound-ports/main-posting-repository.outbound-port';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';

type MockMainPostingRepositoryParamType =
  MockParamTypeForTest<MockMainPostingRepository>;

export class MockMainPostingRepository
  implements MainPostingRepositoryOutboundPort
{
  private readonly result: MockMainPostingRepositoryParamType;

  constructor(result: MockMainPostingRepositoryParamType) {
    this.result = result;
  }

  async insertMainPosting(
    adminId: number,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting | null> {
    const res = await this.result.insertMainPosting?.pop();

    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }

  async findMainPosting(
    options: FindMainPostingOptionsDto,
  ): Promise<MainPostingEntity.MainPosting | null> {
    const res = await this.result.findMainPosting?.pop();

    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }

  async findMainPostings(
    options: FindMainPostingListOptionsForPagenationDto,
  ): Promise<FindMainPostingListOutputDto | null> {
    const res = await this.result.findMainPostings?.pop();

    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }

  async updateMainPosting(
    id: string,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting | null> {
    const res = await this.result.updateMainPosting?.pop();

    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }

  async deleteMainPosting(
    mainPostingId: string,
    adminId: number,
  ): Promise<IsDeletedOutputDto | null> {
    const res = await this.result.deleteMainPosting?.pop();

    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }
}
