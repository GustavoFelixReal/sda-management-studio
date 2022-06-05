import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ScheduleItems extends BaseSchema {
  protected tableName = 'schedule_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table
        .bigInteger('schedule_id')
        .unsigned()
        .references('schedules.id')
        .onDelete('CASCADE')
      table.string('type', 50)
      table.string('status', 50).defaultTo('PENDING')
      table.string('name', 255)
      table.integer('order').nullable()
      table.string('filename', 255).nullable()
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
      table.boolean('is_deleted').defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
