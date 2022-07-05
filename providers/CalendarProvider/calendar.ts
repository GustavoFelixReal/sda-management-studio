import Env from '@ioc:Adonis/Core/Env'

import { Auth, calendar_v3, google } from 'googleapis'

export default class Calendar {
  protected auth: Auth.GoogleAuth
  protected calendar: calendar_v3.Calendar

  constructor() {
    const path = require('path')

    this.auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, '../../google-auth.json'),
      scopes: Env.get('GOOGLE_SCOPES')
    })

    this.calendar = google.calendar({
      version: 'v3',
      auth: this.auth
    })
  }

  public async getEvents() {
    const events = await this.calendar.events.list({
      calendarId: Env.get('GOOGLE_CALENDAR_ID')
    })

    return events.data.items
  }
}
