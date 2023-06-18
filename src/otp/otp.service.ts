import { BadRequestError, InternalServerError } from "routing-controllers"
import { SendOtpBody, VerifyOtpBody } from "./otp.dto"
import { OtpRepository } from "./otp.repository"
import { OtpProviderContext } from "./providers/providerContext"

export class OtpService {
  private otpRepository: OtpRepository
  private otpProvider: OtpProviderContext

  constructor() {
    this.otpRepository = new OtpRepository()
    this.otpProvider = new OtpProviderContext()
  }

  async sendOtp (body: SendOtpBody) {
    const phoneNumber = body.phone
    const otp = this.generateOtp()
    this.otpRepository.saveUserOtp(phoneNumber, otp)
    const isOtpSent = await this.otpProvider.send(phoneNumber, otp)

    if (isOtpSent) {
      return { message: 'OTP is sent' }
    } else {
      throw new InternalServerError('OTP Flow is not available now')
    }
  }

  verifyOtp (body: VerifyOtpBody) {
    const requestOtp = body.otp
    const savedOtp = this.otpRepository.getUserOtp(body.phone)
    
    const isValidOtp = requestOtp === savedOtp
    if (isValidOtp) { return { message: 'OTP is valid' } }
    else { throw new BadRequestError('OTP is mismatch') }
  }

  private generateOtp(): string {
    // generate 6 digits OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    console.log('OTP', otp) // For Testing Purpose
    return otp
  }
}
