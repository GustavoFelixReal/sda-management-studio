import {
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import AppBaseModel from './AppBaseModel'
import Church from './Church'
import ScheduleItem from './ScheduleItem'
import User from './User'

export default class Schedule extends AppBaseModel {
  public static table: string = 'schedules'

  public static allStatus: string[] = [
    'PENDING',
    'APPROVED',
    'REJECTED',
    'CANCELED',
    'COMPLETED'
  ]

  @column({ isPrimary: true })
  public id: number

  @column()
  public churchId: number

  @column()
  public name: string

  @column.dateTime()
  public date: DateTime

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public createdBy: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public updatedBy: number

  @column()
  public isArchived: boolean

  @belongsTo(() => Church, {
    foreignKey: 'churchId'
  })
  public organization: BelongsTo<typeof Church>

  @belongsTo(() => User, {
    foreignKey: 'createdBy'
  })
  public author: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'updatedBy'
  })
  public maintainer: BelongsTo<typeof User>

  @hasMany(() => ScheduleItem, {
    foreignKey: 'scheduleId'
  })
  public scheduleItems: HasMany<typeof ScheduleItem>
}
