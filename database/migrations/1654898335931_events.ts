import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table
        .bigInteger('church_id')
        .unsigned()
        .references('churches.id')
        .onDelete('CASCADE')
      table.string('title', 50)
      table.text('description')
      table.text('objective')
      table.string('voice_over_suggestions', 300)
      table.string('contact_details', 300)
      table.dateTime('date')
      table.boolean('is_recurrent')
      table.string('location', 300)
      table.boolean('is_internal')
      table.string('department')
      table.boolean('is_active')
      table.string('cycle', 4)
      table.timestamp('created_at', { useTz: true })
      table
        .bigint('created_by')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table.timestamp('updated_at', { useTz: true })
      table
        .bigint('updated_by')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
