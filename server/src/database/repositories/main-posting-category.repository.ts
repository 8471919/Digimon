import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MainPostingCategoryRepositoryOutbountPort } from './outbound-ports/main-posting-category-repository.outbound-port';

@Injectable()
export class MainPostingCategoryRepository
  implements MainPostingCategoryRepositoryOutbountPort
{
  constructor(private readonly prisma: PrismaService) {}
}
