import { Chain } from '@ioc:Adonis/Core/Chain'
import Event from 'App/Models/Event'

import Calendar from '@ioc:Calendar'

export default class EventCancelled implements Chain {
  public async handle(event: Event) {
    if (event.status === 'CANCELLED') {
      await Calendar.changeEventStatus(event.calendarEventId, 'cancelled')
    }
  }

  public async next(event: Event) {
    this.handle(event)
  }
}
