import { OtpProviderChannel } from "./provider.interface";
import axios from 'axios'

export class TwilloProvider implements OtpProviderChannel {
  async send(mobile: string, otp: string): Promise<boolean> {
    console.log('send OTP by Twillo')
    const message = this.buildMessageContent(otp)
    return this.sendRequest(mobile, message)
  }

  private async sendRequest (mobile: string, message: string) {
    try {
      const config = { headers: this.getRequestHeaders() }
      const body = {
        phone: mobile,
        msg: message
      }
      const url = 'www.twillo.com/otp'
      await axios.put(url, body, config) // mock
      return true
    } catch (e) {
      // if request status is not 200, catch will be running
      return false
    }
  }

  private getRequestHeaders () {
    return {}
  }

  private buildMessageContent (otp: string) {
    return 'Your OTP is ' + otp
  }
}