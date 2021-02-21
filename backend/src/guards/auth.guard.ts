import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LetXRequest } from '../middlewares/auth.middleware';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: LetXRequest = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
