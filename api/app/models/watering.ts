import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Watering extends BaseModel {
  @column({ isPrimary: true })
  declare wateringId: number

  @column()
  declare roomId: number

  @column.dateTime()
  declare wateringDate: DateTime

  @column()
  declare wateringUser: string
}
