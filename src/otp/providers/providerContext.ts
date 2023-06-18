import { InfobipProvider } from "./Infobip.provider";
import { OtpProviderChannel } from "./provider.interface";
import { TwilloProvider } from "./twillo.provider";

export class OtpProviderContext {
  private otpProvider: OtpProviderChannel | undefined;

  public async send( mobile: string, otp: string): Promise<boolean> {
    this.otpProvider = this.getOtpProvider(mobile)
    return this.otpProvider.send(mobile, otp)
  }

  private getOtpProvider (mobile: string): OtpProviderChannel {
    const isEgyptNumber = mobile[0] === '0' && mobile[1] === '1'
    
    if (isEgyptNumber) { return new InfobipProvider }
    return new TwilloProvider
  }
}
