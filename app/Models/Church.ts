import { DateTime } from 'luxon'
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from './AppBaseModel'
import User from './User'
import Schedule from './Schedule'

export default class Church extends AppBaseModel {
  protected tableName: string = 'churches'

  protected static get visible() {
    return ['id', 'name', 'isBlocked', 'isDeleted', 'createdAt', 'updatedAt']
  }

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
