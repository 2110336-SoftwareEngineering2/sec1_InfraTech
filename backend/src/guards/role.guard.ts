import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LetXRequest } from '../middlewares/auth.middleware';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: LetXRequest = context.switchToHttp().getRequest();
    const role = this.reflector.get<string>('role', context.getHandler());

    if (request.user.type !== role) {
      throw new ForbiddenException(
        'The user is not ' + (role as string).toLowerCase(),
      );
    }
    return true;
  }
}
