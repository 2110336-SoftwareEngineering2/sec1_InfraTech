import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import * as config from 'config';

const authConfig = config.get('auth');

export interface TraineeProfileDto {
  id: string;
  email: string;
  type: string;
  profile: Trainee;
}

export interface TrainerProfileDto {
  id: string;
  email: string;
  type: string;
  profile: Trainer;
}

export class AuthUserGetter {
  public id: string;
  public email: string;
  public type: string;

  constructor(id, email, type) {
    this.id = id;
    this.email = email;
    this.type = type;
  }
}

export interface LetXRequest extends Request {
  user: AuthUserGetter;
}

export function AuthMiddleware(
  req: LetXRequest,
  res: Response,
  next: NextFunction,
) {
  // TODO: Check exp
  let token = req.header('Authorization');
  if (token) {
    try {
      token = token.split(' ')[1];
      const data: any = jwt.verify(token, authConfig.jwtSecret);

      req.user = new AuthUserGetter(data.sub, data.email, data.type);
    } catch (error) {
      // JsonWebTokenError: invalid token
    }
  }

  next();
}
