import { ApplicationContract } from '@ioc:Adonis/Core/Application'

import Env from '@ioc:Adonis/Core/Env'

import { google } from 'googleapis'

export default class AppProvider {
  public calendar

  constructor(protected app: ApplicationContract) {
    this.calendar = google.calendar({
      version: 'v3',
      auth: Env.get('CALENDAR_KEY')
    })
  }

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {}

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
