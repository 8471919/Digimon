import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import {
  ADMIN_REPOSITORY_OUTBOUND_PORT,
  AdminRepositoryOutboundPort,
} from './outbound-ports/admin-repository.outbound-port';

@Injectable()
export class AdminRepository implements AdminRepositoryOutboundPort {
  constructor(
    @Inject(ADMIN_REPOSITORY_OUTBOUND_PORT)
    private readonly adminRepo: AdminRepositoryOutboundPort,
  ) {}
}
