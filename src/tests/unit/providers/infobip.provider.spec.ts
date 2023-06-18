import Axios from "axios";
import { InfobipProvider } from "../../../otp/providers/Infobip.provider";

describe('Infobip Service', () => {
  let infobipProvider = new InfobipProvider()
  
  it('be defined', () => {
    expect(infobipProvider).toBeDefined()
  })
  
  describe('send', () => {
    let axiosPostSpy: jest.SpyInstance
    let response: boolean
    describe('Given phone nubmer 01987547808 and OTP 978525', () => {
      describe('When send OTP message', () => {
        beforeAll(async() => {
          jest.restoreAllMocks()
          axiosPostSpy = jest.spyOn(Axios, 'post').mockReturnThis()

          const phone = '01987547808'
          const otp = '978525'

          response = await infobipProvider.send(phone, otp)
        })

        describe('Then response', () => {
          it('be true', () => {
            expect(response).toBe(true)
          })
        })

        describe('Then call axios', () => {
          let requestCalls: any[]
          beforeAll(() => {
            requestCalls = axiosPostSpy.mock.calls
          })
          describe('count', () => {
            it('once', () => {
              expect(requestCalls).toHaveLength(1)
            })
          })
          it('with url www.Infobip.com/otp', () => {
            expect(requestCalls[0][0]).toBe('www.Infobip.com/otp')
          })
          it('with mobile 01987547808', () => {
            expect(requestCalls[0][1].mobile).toBe('01987547808')
          })
          it('with msg Your OTP is 978525', () => {
            expect(requestCalls[0][1].msg).toBe('Your OTP is 978525')
          })
          it('with limiter 5', () => {
            expect(requestCalls[0][1].limiter).toBe(5)
          })
        })

      })
    })
    
    describe('Given phone nubmer 01987547808 and OTP 978525', () => {
      describe('When send OTP message and Infobip is down', () => {
        beforeAll(async() => {
          jest.restoreAllMocks()
          axiosPostSpy = jest.spyOn(Axios, 'post').mockRejectedValue({})

          const phone = '01987547808'
          const otp = '978525'

          response = await infobipProvider.send(phone, otp)
        })

        describe('Then response', () => {
          it('be false', () => {
            expect(response).toBe(false)
          })
        })

        describe('Then call axios', () => {
          let requestCalls: any[]
          beforeAll(() => {
            requestCalls = axiosPostSpy.mock.calls
          })
          describe('count', () => {
            it('once', () => {
              expect(requestCalls).toHaveLength(1)
            })
          })
          it('with url www.Infobip.com/otp', () => {
            expect(requestCalls[0][0]).toBe('www.Infobip.com/otp')
          })
          it('with mobile 01987547808', () => {
            expect(requestCalls[0][1].mobile).toBe('01987547808')
          })
          it('with msg Your OTP is 978525', () => {
            expect(requestCalls[0][1].msg).toBe('Your OTP is 978525')
          })
          it('with limiter 5', () => {
            expect(requestCalls[0][1].limiter).toBe(5)
          })
        })

      })
    })

  })
});
