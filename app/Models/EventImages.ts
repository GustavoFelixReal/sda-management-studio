import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import AppBaseModel from './AppBaseModel'
import Event from './Event'

export default class EventImages extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public src: string

  @belongsTo(() => Event, {
    foreignKey: 'eventId'
  })
  public event: BelongsTo<typeof Event>
}
