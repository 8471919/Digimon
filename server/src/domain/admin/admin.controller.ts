import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
