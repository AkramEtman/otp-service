import { OtpProviderChannel } from "./provider.interface";
import axios from 'axios'

export class InfobipProvider implements OtpProviderChannel {
  async send(mobile: string, otp: string): Promise<boolean> {
    console.log('send OTP by Infobip')
    const message = this.buildMessageContent(mobile, otp)
    return this.sendRequest(mobile, message)
  }

  private async sendRequest (mobile: string, message: string) {
    try {
      const config = { headers: this.getRequestHeaders() }
      const body = {
        mobile,
        msg: message,
        limiter: 5
      }
      const url = 'www.Infobip.com/otp'
      await axios.post(url, body, config) // mock
      return true
    } catch (e) {
      // if request status is not 200, catch will be running
      return false
    }
  }

  private getRequestHeaders () {
    return {}
  }

  private buildMessageContent (mobile: string, otp: string) {
    return 'Your OTP is ' + otp 
  }
}