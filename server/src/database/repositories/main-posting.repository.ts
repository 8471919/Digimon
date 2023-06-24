import { Injectable } from '@nestjs/common';
import { MainPostingRepositoryOutboundPort } from './outbound-ports/main-posting-repository.outbound-port';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateMainPostingInputDto,
  FindMainPostingOptionsDto,
} from '../dtos/main-posting/main-posting.outbound-port.dto';
import { MainPostingEntity } from '../models/main-posting/main-posting.entity';
import { dateAndBigIntToString } from 'src/utils/functions/date-and-bigint-to-string.function';

@Injectable()
export class MainPostingRepository
  implements MainPostingRepositoryOutboundPort
{
  constructor(private readonly prisma: PrismaService) {}

  async insertMainPosting(
    adminId: number,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting | null> {
    const mainPosting = await this.prisma.mainPosting.create({
      data: { ...data, adminId },
    });

    return dateAndBigIntToString(mainPosting);
  }

  async findMainPosting(
    options: FindMainPostingOptionsDto,
  ): Promise<MainPostingEntity.MainPosting | null> {
    const { id, ...otherOptions } = options;

    const mainPosting = await this.prisma.mainPosting.findFirst({
      where: id
        ? {
            ...otherOptions,
            id: BigInt(id),
          }
        : {
            ...otherOptions,
          },
    });

    return dateAndBigIntToString(mainPosting);
  }

  async updateMainPosting(
    id: string,
    data: CreateMainPostingInputDto,
  ): Promise<MainPostingEntity.MainPosting | null> {
    const mainPosting = await this.prisma.mainPosting.update({
      data: data,
      where: { id: Number(id) },
    });

    return dateAndBigIntToString(mainPosting);
  }
}
