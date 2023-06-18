import request from 'supertest'
import app from '../../app'
import { OtpRepository } from '../../otp/otp.repository';

describe('OTP Controller', () => {
  describe('/otp/send', () => {
    let response: request.Response
    beforeAll(async() => {
      jest.restoreAllMocks()

      response = await request(app)
        .post("/otp/send")
        .send({
          phone: '01966998877'
        })
    })
    it('status be 200', async() => {
      expect(response.statusCode).toBe(200);
    });
    it('message be OTP is sent', async() => {
      expect(response.body.message).toBe("OTP is sent");
    });
  })

  describe('/otp/verify', () => {
    describe('OTP is match', () => {
      let response: request.Response
      beforeAll(async() => {
        jest.restoreAllMocks()
        const phone = '01966998877'
        const expectedOtp = '974235'

        jest.spyOn(OtpRepository.prototype, 'getUserOtp').mockReturnValue(expectedOtp)
   
        response = await request(app)
          .post("/otp/verify")
          .send({
            phone,
            otp: expectedOtp
          })
      })
      it('status be 200', async() => {
        expect(response.statusCode).toBe(200);
      });
      it('message be OTP is valid', async() => {
        expect(response.body.message).toBe("OTP is valid");
      });
    })

    describe('OTP is mismatch', () => {
      let response: request.Response
      beforeAll(async() => {
        jest.restoreAllMocks()
        const phone = '01966998877'
        const expectedOtp = '963258'

        jest.spyOn(OtpRepository.prototype, 'getUserOtp').mockReturnValue(expectedOtp)
   
        response = await request(app)
          .post("/otp/verify")
          .send({
            phone,
            otp: "268426"
          })
      })
      it('status be 400', async() => {
        expect(response.statusCode).toBe(400);
      });
      it('message be OTP is mismatch', async() => {
        expect(response.body.message).toBe("OTP is mismatch");
      });
    })
  })

});
