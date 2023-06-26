import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IsDeletedOutputDto } from 'src/database/dtos/common/crud-bool.dto';
import {
  CreateMainPostingInputDto,
  FindMainPostingListOptionsForPagenationDto,
  FindMainPostingListOutputDto,
  FindMainPostingOptionsDto,
} from 'src/database/dtos/main-posting/main-posting.outbound-port.dto';
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

  async getMainPosting(
    options: FindMainPostingOptionsDto,
  ): Promise<MainPostingEntity.MainPosting> {
    const mainPosting = await this.mainPostingRepo.findMainPosting(options);

    if (!mainPosting) {
      throw new NotFoundException('not found');
    }

    return mainPosting;
  }

  async getMainPostingList(
    options: FindMainPostingListOptionsForPagenationDto,
  ): Promise<FindMainPostingListOutputDto> {
    const mainPostings = await this.mainPostingRepo.findMainPostings(options);

    if (!mainPostings) {
      throw new BadRequestException('Incorrect option');
    }

    return mainPostings;
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

  async removeMainPosting(
    mainPostingId: string,
    adminId: number,
  ): Promise<IsDeletedOutputDto> {
    const isDeleted = await this.mainPostingRepo.deleteMainPosting(
      mainPostingId,
      adminId,
    );

    if (!isDeleted) {
      throw new UnauthorizedException('UnAuthorized');
    }

    return isDeleted;
  }
}
