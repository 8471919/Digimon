import { IsDeletedOutputDto } from 'src/database/dtos/common/crud-bool.dto';
import {
  CreateMainPostingInputDto,
  FindMainPostingListOptionsForPagenationDto,
  FindMainPostingListOutputDto,
  FindMainPostingOptionsDto,
} from 'src/database/dtos/main-posting/main-posting.outbound-port.dto';
import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';

export const MAIN_POSTING_REPOSITORY_OUTBOUND_PORT =
  'MAIN_POSTING_REPOSITORY_OUTBOUND_PORT' as const;

export interface MainPostingRepositoryOutboundPort {
  insertMainPosting(
    adminId: number,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting | null>;

  findMainPosting(
    options: FindMainPostingOptionsDto,
  ): Promise<MainPostingEntity.MainPosting | null>;

  findMainPostings(
    options: FindMainPostingListOptionsForPagenationDto,
  ): Promise<FindMainPostingListOutputDto | null>;

  updateMainPosting(
    id: string,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting | null>;

  deleteMainPosting(
    mainPostingId: string,
    adminId: number,
  ): Promise<IsDeletedOutputDto | null>;
}
