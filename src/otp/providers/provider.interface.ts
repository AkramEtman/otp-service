export interface OtpProviderChannel {
  send(mobile: string, otp: string): Promise<boolean>;
}
