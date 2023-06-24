import { Controller, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MainPostingService } from './main-posting.service';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import { CreateMainPostingInputDto } from 'src/database/dtos/main-posting/main-posting.outbound-port.dto';
import { IsDeletedOutputDto } from 'src/database/dtos/common/crud-bool.dto';

@Controller('api/v1/main-posting')
export class MainPostingController {
  constructor(private readonly mainPostingService: MainPostingService) {}

  @UseGuards(JwtAdminGuard)
  @TypedRoute.Post()
  async createMainPosting(
    @TypedBody() body: CreateMainPostingInputDto,
    @User() user: AdminLogInDto,
  ) {
    const mainPosting = await this.mainPostingService.createMainPosting(
      user.id,
      {
        ...body,
      },
    );

    return mainPosting;
  }

  @UseGuards(JwtAdminGuard)
  @TypedRoute.Put(':id')
  async modifyMainPosting(
    @TypedBody() body: CreateMainPostingInputDto,
    @TypedParam('id') id: string,
    @User() user: AdminLogInDto,
  ) {
    const mainPosting = await this.mainPostingService.modifyMainPosting(
      id,
      user.id,
      {
        ...body,
      },
    );

    return mainPosting;
  }

  @UseGuards(JwtAdminGuard)
  @TypedRoute.Delete(':id')
  async removeMainPosting(
    @TypedParam('id') id: string,
    @User() user: AdminLogInDto,
  ): Promise<IsDeletedOutputDto> {
    const isDeleted = await this.mainPostingService.removeMainPosting(
      id,
      user.id,
    );

    return isDeleted;
  }
}
