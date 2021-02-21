import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm';
import { Trainer } from 'src/entities/trainer.entity';
import { Trainee } from 'src/entities/trainee.entity';
import { UserType } from 'src/register/enums/user-type.enum';

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
  user: AuthUserGetter
}

export function AuthMiddleware(req: LetXRequest, res: Response, next: NextFunction) {
  // TODO: Check exp
  let token = req.header("Authorization");
  if (token) {
    token = token.split(" ")[1];
    const data: any = jwt.verify(token, "secret");
    console.log(data);

    req.user = new AuthUserGetter(data.sub, data.email, data.type);
  }

  next();
}
