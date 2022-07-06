import { Chain } from '@ioc:Adonis/Core/Chain'
import Event from 'App/Models/Event'

import { inject } from '@adonisjs/core/build/standalone'
import Calendar from '@ioc:Calendar'
import EventCancelled from './EventCancelled'

@inject()
export default class EventApproved implements Chain {
  public async handle(event: Event) {
    if (event.status === 'APPROVED') {
      const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

      console.log(event)

      await Calendar.createEvent({
        id: event.calendarEventId,
        anyoneCanAddSelf: true,
        status: 'confirmed',
        summary: event.title,
        location: event.location,
        description: event.description,
        start: {
          dateTime: event.startDate.toString(),
          timeZone
        },
        end: {
          dateTime: event.endDate.toString(),
          timeZone
        }
      })
    }
  }

  public async next(event: Event) {
    this.handle(event)

    new EventCancelled().next(event)
  }
}
