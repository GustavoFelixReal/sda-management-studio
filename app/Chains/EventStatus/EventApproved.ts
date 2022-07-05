import { Chain } from '@ioc:Adonis/Core/Chain'
import Event from 'App/Models/Event'

import Calendar from '@ioc:Calendar'

export default class EventApproved implements Chain {
  public async handle(event: Event) {
    if (event.status === 'APPROVED') {
      await Calendar.getEvents()

      console.log('doing thing')
    }
  }

  public async next() {
    console.log(
      this.handle(
        await Event.create({
          status: 'APPROVED'
        })
      )
    )
  }
}
