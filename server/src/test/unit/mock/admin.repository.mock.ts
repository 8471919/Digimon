import { AdminOptionsDto } from 'src/database/dtos/admin/admin-options.dto';
import {
  AdminSignUpInputDto,
  UpdateAdminInputDto,
} from 'src/database/dtos/admin/admin.inbound-port.dto';
import {
  FindAdminForListForCommonDto,
  FindAdminInfoForCommonDto,
  FindOneAdminExceptPasswordDto,
} from 'src/database/dtos/admin/admin.outbound-port.dto';
import { AdminEntity } from 'src/database/models/admin/admin.entity';
import { AdminRepositoryOutboundPort } from 'src/database/repositories/outbound-ports/admin-repository.outbound-port';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';

/**
 * 동일한 repository 함수를 두 번 호출할 경우, 결과 값을 1개만 쓸수 밖에 없다는 단점이 있다.
 * 그래서 차라리 Array형식으로 만들어서 함수 호출할 때 마다, pop을 하는 형식으로 하도록 만들었다.
 * 어차피, pop으로 변수에 한 번 할당하면, 해당 변수를 이용해서 동일한 값을 재사용 할 수 있으니까.
 */
type MockAdminRepositoryParamType = MockParamTypeForTest<MockAdminRepository>;

export class MockAdminRepository implements AdminRepositoryOutboundPort {
  private readonly result: MockAdminRepositoryParamType;

  constructor(result: MockAdminRepositoryParamType) {
    this.result = result;
  }

  async insertAdmin(
    adminInfo: AdminSignUpInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const res = this.result.insertAdmin?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }
  async findOneAdminForSign(email: string): Promise<AdminEntity.Admin | null> {
    const res = this.result.findOneAdminForSign?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }

  async findOneAdminByOptions(
    options: AdminOptionsDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const res = this.result.findOneAdminByOptions?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }

  async findOneAdminForCommon(
    options: AdminOptionsDto,
  ): Promise<FindAdminInfoForCommonDto | null> {
    const res = this.result.findOneAdminForCommon?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }

  async findAdminList(
    options: AdminOptionsDto,
  ): Promise<FindAdminForListForCommonDto | null> {
    const res = this.result.findAdminList?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }

  async updateAdmin(
    id: number,
    data: UpdateAdminInputDto,
  ): Promise<FindOneAdminExceptPasswordDto | null> {
    const res = this.result.updateAdmin?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }

    return res;
  }
}
