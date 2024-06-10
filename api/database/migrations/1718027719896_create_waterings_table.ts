import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'waterings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('watering_id').primary()
      table.integer('room_id').unsigned().references('rooms.room_id').onDelete('CASCADE')
      table.timestamp('watering_date', { useTz: true }).notNullable()
      table.string('watering_user').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
