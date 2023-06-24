import { CreateMainPostingInputDto } from 'src/database/dtos/main-posting/main-posting.outbound-port.dto';
import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';

export const MAIN_POSTING_REPOSITORY_OUTBOUND_PORT =
  'MAIN_POSTING_REPOSITORY_OUTBOUND_PORT' as const;

export interface MainPostingRepositoryOutboundPort {
  insertMainPosting(
    adminId: number,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting | null>;

  updateMainPosting(
    id: number,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting | null>;
}
