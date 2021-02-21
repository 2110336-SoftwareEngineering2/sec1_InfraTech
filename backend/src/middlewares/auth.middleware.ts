import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class AuthUserGetter {

}

export interface LetXRequest extends Request {
  user: AuthUserGetter
}

export function AuthMiddleware(req: LetXRequest, res: Response, next: NextFunction) {
  // TODO: Check exp
  console.log('Request...');
  next();
}
