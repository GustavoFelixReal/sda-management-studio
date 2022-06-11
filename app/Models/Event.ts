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
import EventImages from './EventImages'
import EventLinks from './EventLinks'

export default class Event extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public churchId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public objective: string

  @column()
  public voiceOverSuggestions: string

  @column()
  public contactDetails: string

  @column()
  public date: DateTime

  @column()
  public isRecurrent: boolean

  @column()
  public location: string

  @column()
  public isInternal: boolean

  @column()
  public department: string

  @column()
  public isActive: boolean

  @column()
  public cycle: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Church, {
    foreignKey: 'churchId'
  })
  public organization: BelongsTo<typeof Church>

  @hasMany(() => EventLinks, {
    foreignKey: 'eventId'
  })
  public relatedLinks: HasMany<typeof EventLinks>

  @hasMany(() => EventImages, {
    foreignKey: 'eventId'
  })
  public images: HasMany<typeof EventImages>
}
