/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  getLogin(@Res() res: Response) {
    console.log("dancok bangsatttttt!!!!")
    return res.sendFile('login.html', { root: 'public' });
  }

  @Post('login')
  async postLogin(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    const result = await this.authService.validateUser(username, password);
    if (result) {
      req.session.authenticated = true;
      return res.redirect('/portal');
    }
    return res.redirect('/auth/login');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.authenticated = false;
    res.redirect('/auth/login');
  }
}
