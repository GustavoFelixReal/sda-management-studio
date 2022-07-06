import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import AppBaseModel from './AppBaseModel'
import Schedule from './Schedule'
import User from './User'

export default class Church extends AppBaseModel {
  public static table: string = 'churches'

  protected static get visible() {
    return ['id', 'name', 'isBlocked', 'isDeleted', 'createdAt', 'updatedAt']
  }

  public static departments: string[] = [
    'LAR E FAMÍLIA',
    'DESBRAVADORES',
    'COMUNICAÇÃO',
    'JOVENS'
  ]

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public isBlocked: boolean

  @column()
  public isDeleted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'churchId'
  })
  public users: HasMany<typeof User>

  @hasMany(() => Schedule, {
    foreignKey: 'scheduleId'
  })
  public schedules: HasMany<typeof Schedule>
}
