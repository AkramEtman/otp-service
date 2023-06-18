import { BadRequestError, InternalServerError } from "routing-controllers"
import { SendOtpBody, VerifyOtpBody } from "./otp.dto"
import { OtpRepository } from "./otp.repository"

export class OtpService {
  private otpRepository: OtpRepository
  constructor() {
    this.otpRepository = new OtpRepository()
  }

  async sendOtp (body: SendOtpBody) {
    const phoneNumber = body.phone
    const otp = this.generateOtp()
    this.otpRepository.saveUserOtp(phoneNumber, otp)
    const isOtpSent = await this.sendOtpMessage(phoneNumber, otp)

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
  
  private async sendOtpMessage (phoneNumber: string, otp: string): Promise<boolean> {
    try {
      const requestBody = {
        phoneNumber,
        message: 'Your OTP is ' + otp
      }
      const url = 'www.service-y.com/otp'
      // await axios.post(url, requestBody) // mock
      return true
    } catch (e) {
      // if request status is not 200, catch will be running
      return false
    }
  }
}
