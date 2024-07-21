import { Request, Response } from 'express';
import { AppService } from './app.service';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generate_204')
  handleAndroidConnectivityCheck(@Res() res: Response) {
    this.logger.log("KONTOL")
    console.log("dancok bangsatttttt!!!! 123")
    res.redirect(302, '/auth/login');
  }

  @Get('connecttest.txt')
  handleWindowsConnectivityCheck(@Res() res: Response) {
    this.logger.log("KONTOL2")
    res.redirect(302, '/auth/login');
  }

  @Get('hotspot-detect.html')
  handleIOSConnectivityCheck(@Res() res: Response) {
    Logger.log("KONTOL3")
    res.redirect(302, '/auth/login');
  }
}
