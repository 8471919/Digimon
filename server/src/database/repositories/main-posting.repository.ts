import { Injectable } from '@nestjs/common';
import { MainPostingRepositoryOutboundPort } from './outbound-ports/main-posting-repository.outbound-port';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MainPostingRepository
  implements MainPostingRepositoryOutboundPort
{
  constructor(private readonly prisma: PrismaService) {}
}
