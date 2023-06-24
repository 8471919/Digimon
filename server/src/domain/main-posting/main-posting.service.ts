import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMainPostingInputDto } from 'src/database/dtos/main-posting/main-posting.outbound-port.dto';
import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';
import {
  MAIN_POSTING_REPOSITORY_OUTBOUND_PORT,
  MainPostingRepositoryOutboundPort,
} from 'src/database/repositories/outbound-ports/main-posting-repository.outbound-port';

@Injectable()
export class MainPostingService {
  constructor(
    @Inject(MAIN_POSTING_REPOSITORY_OUTBOUND_PORT)
    private readonly mainPostingRepo: MainPostingRepositoryOutboundPort,
  ) {}

  async createMainPosting(
    adminId: number,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting> {
    const mainPosting = await this.mainPostingRepo.insertMainPosting(
      adminId,
      data,
    );

    if (!mainPosting) {
      throw new BadRequestException('Incorrect option');
    }

    return mainPosting;
  }

  async modifyMainPosting(
    mainPostingId: string,
    adminId: number,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting> {
    const isFound = await this.mainPostingRepo.findMainPosting({
      id: mainPostingId,
      adminId,
    });

    if (!isFound) {
      throw new UnauthorizedException("You're not Author");
    }

    const mainPosting = await this.mainPostingRepo.updateMainPosting(
      mainPostingId,
      data,
    );

    if (!mainPosting) {
      throw new BadRequestException('Incorrect option');
    }

    return mainPosting;
  }
}
