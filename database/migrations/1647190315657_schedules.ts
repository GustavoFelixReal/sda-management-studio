import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schedules extends BaseSchema {
  protected tableName = 'schedules'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table
        .bigInteger('church_id')
        .unsigned()
        .references('churches.id')
        .onDelete('CASCADE')
      table.string('name', 255)
      table.timestamp('date', { useTz: true })
      table.string('status', 50).defaultTo('PENDING')
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
      table.boolean('is_archived').defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
