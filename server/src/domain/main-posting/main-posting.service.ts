import { Inject, Injectable } from '@nestjs/common';
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
}
