import { Body, Get, JsonController, Post, Res } from 'routing-controllers'
import { SendOtpBody, VerifyOtpBody } from './otp.dto';
import { OtpService } from './otp.service';

@JsonController()
export class OtpController {
  private otpService: OtpService
  constructor() {
    this.otpService = new OtpService()
  }

  @Post('/send')
  async sendOtp (@Body() body: SendOtpBody, @Res() res: any) {
    return this.otpService.sendOtp(body)
  }

  @Post('/verify')
  async verifyOtp (@Body() body: VerifyOtpBody) {
    return this.otpService.verifyOtp(body)
  }
}