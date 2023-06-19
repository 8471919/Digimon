import { Inject, Injectable } from '@nestjs/common';
import {
  MAIN_POSTING_CATEGORY_REPOSITORY_OUTBOUND_PORT,
  MainPostingCategoryRepositoryOutbountPort,
} from 'src/database/repositories/outbound-ports/main-posting-category-repository.outbound-port';

@Injectable()
export class MainPostingCategoryService {
  constructor(
    @Inject(MAIN_POSTING_CATEGORY_REPOSITORY_OUTBOUND_PORT)
    private readonly mainPostingCategoryRepo: MainPostingCategoryRepositoryOutbountPort,
  ) {}
}
