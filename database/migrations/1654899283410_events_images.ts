import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventsImages extends BaseSchema {
  protected tableName = 'events_images'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .bigInteger('event_id')
        .unsigned()
        .references('events.id')
        .onDelete('CASCADE')
      table.string('description', 50)
      table.string('src', 255)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
