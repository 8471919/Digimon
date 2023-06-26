import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query'],
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (
        params.action === 'findFirst' ||
        params.action === 'findMany' ||
        params.action === 'findRaw' ||
        params.action === 'findUnique'
      ) {
        console.log(params.args);
        params.args.where['deletedAt'] = null;
        console.log(params.args);
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
