import { BadRequestException, Injectable } from '@nestjs/common';
import { MainPostingRepositoryOutboundPort } from './outbound-ports/main-posting-repository.outbound-port';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateMainPostingInputDto,
  FindMainPostingOptionsDto,
} from '../dtos/main-posting/main-posting.outbound-port.dto';
import { MainPostingEntity } from '../models/main-posting/main-posting.entity';
import { dateAndBigIntToString } from 'src/utils/functions/date-and-bigint-to-string.function';
import { IsDeletedOutputDto } from '../dtos/common/crud-bool.dto';

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

  async deleteMainPosting(
    mainPostingId: string,
    adminId: number,
  ): Promise<IsDeletedOutputDto | null> {
    const res = await this.prisma.$transaction(async (tx) => {
      const mainPosting = await tx.mainPosting.updateMany({
        data: {
          deletedAt: new Date().toISOString(),
        },
        where: {
          id: BigInt(mainPostingId),
          adminId,
        },
      });

      if (mainPosting.count !== 1) {
        throw new BadRequestException('incorrect option');
      }

      return { isDeleted: true };
    });

    return res;
  }
}
