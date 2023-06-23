import { Controller } from '@nestjs/common';
import { MainPostingService } from './main-posting.service';

@Controller('api/v1/main-posting')
export class MainPostingController {
  constructor(private readonly mainPostingService: MainPostingService) {}
}
