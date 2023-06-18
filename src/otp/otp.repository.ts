const userOtp: {[key: string] : string} = {} // mock DB

export class OtpRepository {

  saveUserOtp (phoneNumber: string, otp: string): void {
    userOtp[phoneNumber] = otp
  }

  getUserOtp (phoneNumber: string): string {
    return userOtp[phoneNumber]
  }
}