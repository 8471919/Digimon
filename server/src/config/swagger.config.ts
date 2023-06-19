import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

export function swaggerSetUp(app: INestApplication) {
  const docs = fs.readFileSync(
    path.join(__dirname, '../../swagger.json'),
    'utf-8',
  );

  SwaggerModule.setup('api-docs', app, JSON.parse(docs));
}
