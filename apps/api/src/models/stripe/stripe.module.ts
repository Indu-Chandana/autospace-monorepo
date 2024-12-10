import { Module } from '@nestjs/common'

import { BookingsService } from '../bookings/graphql/bookings.service'

import StripeService from './stripe.service'
import { StripeController } from './stripe.controller'

@Module({
  controllers: [StripeController],
  providers: [StripeService, BookingsService],
})
export class StripeModule {}
