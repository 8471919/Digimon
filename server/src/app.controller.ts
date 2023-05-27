import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { TypedBody, TypedRoute } from '@nestia/core';
import { CreateUserInputDto } from './dtos/user/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TypedRoute.Post()
  async register(
    @TypedBody() body: CreateUserInputDto,
  ): Promise<CreateUserInputDto> {
    return body;
  }
}
