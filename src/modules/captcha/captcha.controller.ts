import { Controller, Get, Req, Res, Post } from "@nestjs/common";
import { Request, Response } from "express";
const svgCaptcha = require('svg-captcha');

@Controller('/captcha')
export class CaptchaController {

  @Post('/get_captcha')
  public getCaptcha(@Req() req: Request, @Res() res: Response) {
    const captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;

    res.type('svg');
    res.status(200).send(captcha.data);
  }
}