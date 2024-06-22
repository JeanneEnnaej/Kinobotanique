import { DateTime } from 'luxon'
import Room from './room.js'

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Watering extends BaseModel {
  @column({ isPrimary: true })
  declare wateringId: number

  @column()
  declare roomId: number

  @column.dateTime()
  declare wateringDate: DateTime

  @column()
  declare wateringUser: string

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>
}
