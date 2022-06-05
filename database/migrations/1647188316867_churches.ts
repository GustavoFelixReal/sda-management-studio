import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Churches extends BaseSchema {
  protected tableName = 'churches'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name', 255)
      table.boolean('is_blocked').defaultTo(false)
      table.boolean('is_deleted').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
