import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtMasterAdminGuard extends AuthGuard('jwt-master-admin') {}
