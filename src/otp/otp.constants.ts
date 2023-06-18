import { InfobipProvider } from "./providers/Infobip.provider";
import { TwilloProvider } from "./providers/twillo.provider";

export enum OtpServiceType {
  Infobip = 'Infobip',
  Twillo = 'Twillo'
}

export const OtpServiceModelEnum = {
  [OtpServiceType.Infobip]: InfobipProvider,
  [OtpServiceType.Twillo]: TwilloProvider
};