import { Controller, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MainPostingService } from './main-posting.service';
import { TypedBody, TypedParam, TypedQuery, TypedRoute } from '@nestia/core';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AdminLogInDto } from 'src/database/dtos/auth/admin-login.dto';
import {
  CreateMainPostingInputDto,
  FindMainPostingListOptionsForPagenationDto,
} from 'src/database/dtos/main-posting/main-posting.outbound-port.dto';
import { IsDeletedOutputDto } from 'src/database/dtos/common/crud-bool.dto';
import { MainPostingEntity } from 'src/database/models/main-posting/main-posting.entity';
import { MainPostingPagenationQueryInputDto } from 'src/database/dtos/main-posting/main-posting.inbound-port.dto';

@Controller('api/v1/main-posting')
export class MainPostingController {
  constructor(private readonly mainPostingService: MainPostingService) {}

  @TypedRoute.Get('list')
  async getMainPostingList(
    @TypedQuery() query: MainPostingPagenationQueryInputDto,
  ) {
    const input: FindMainPostingListOptionsForPagenationDto = {
      countPerPage: query.countPerPage,
      pageNumber: query.pageNumber,
      options: {
        adminId: query.adminId,
        categoryId: query.categoryId,
      },
      order:
        query.orderType && query.order
          ? {
              type: query.orderType,
              order: query.order,
            }
          : undefined,
    };

    const mainPostings = await this.mainPostingService.getMainPostingList(
      input,
    );

    return mainPostings;
  }

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
  ): Promise<MainPostingEntity.MainPosting> {
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
