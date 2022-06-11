import Env from '@ioc:Adonis/Core/Env'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import { DateTime } from 'luxon'

import Church from 'App/Models/Church'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await Church.createMany([
      {
        id: 1,
        name: Env.get('DC_NAME'),
        isBlocked: false,
        isDeleted: false,
        createdAt: DateTime.now()
      }
    ])
    // Write your database queries inside the run method
  }
}
