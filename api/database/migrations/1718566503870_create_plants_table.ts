import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'plants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('plant_id').primary()
      table.integer('room_id').unsigned().references('rooms.room_id').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('watering_frequency')
      table.specificType('photo', 'bytea').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
