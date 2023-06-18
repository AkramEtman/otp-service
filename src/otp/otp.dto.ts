import { IsString } from 'class-validator';

export class SendOtpBody {
  @IsString()
  phone: string;
}

export class VerifyOtpBody {
  @IsString()
  phone: string;

  @IsString()
  otp: string;
}