import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from './AppBaseModel'
import Schedule from './Schedule'
import User from './User'

export default class ScheduleItem extends AppBaseModel {
  protected tableName: string = 'schedule_items'

  @column({ isPrimary: true })
  public id: number

  @column()
  public scheduleId: number

  @column()
  public status: string

  @column()
  public name: string

  @column()
  public order: number

  @column()
  public fileName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public createdBy: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public updatedBy: number

  @column()
  public isDeleted: boolean

  @belongsTo(() => Schedule, {
    foreignKey: 'scheduleId'
  })
  public schedule: BelongsTo<typeof Schedule>

  @belongsTo(() => User, {
    foreignKey: 'createdBy'
  })
  public author: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'updatedBy'
  })
  public maintainer: BelongsTo<typeof User>
}
