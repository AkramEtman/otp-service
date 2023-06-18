import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import express from 'express'
import { OtpController } from './otp/otp.controller'

const expressApp = express()
expressApp.enable('trust proxy')
expressApp.use(express.urlencoded({ extended: false }))

useExpressServer(expressApp, {
  routePrefix: '/otp',
  controllers: [OtpController],
  validation: true
})

const port = process.env.PORT || 4444

expressApp.listen(port)
expressApp.on('listening', () => {
  console.log(`server is working on localhost -- ${port}`)
})

export default expressApp;
