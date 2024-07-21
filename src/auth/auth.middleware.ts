import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.authenticated) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  }
}