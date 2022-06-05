import { DateTime } from 'luxon'
import {
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

import AppBaseModel from './AppBaseModel'
import Church from './Church'
import Schedule from './Schedule'
import ScheduleItem from './ScheduleItem'

export default class User extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public churchId: number

  @column()
  public name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column()
  public isBlocked: boolean

  @column()
  public isDeleted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(() => Church, {
    foreignKey: 'churchId'
  })
  public organization: BelongsTo<typeof Church>

  @hasMany(() => Schedule, {
    foreignKey: 'createdBy'
  })
  public createdSchedule: HasMany<typeof Schedule>

  @hasMany(() => Schedule, {
    foreignKey: 'updatedBy'
  })
  public updatedSchedule: HasMany<typeof Schedule>

  @hasMany(() => ScheduleItem, {
    foreignKey: 'createdBy'
  })
  public createdScheduleItem: HasMany<typeof ScheduleItem>

  @hasMany(() => ScheduleItem, {
    foreignKey: 'updatedBy'
  })
  public updatedScheduleItem: HasMany<typeof ScheduleItem>
}
