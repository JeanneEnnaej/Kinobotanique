import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Room from './room.js'

export default class Plant extends BaseModel {
  @column({ isPrimary: true })
  declare plantId: number

  @column()
  declare name: string

  @column()
  declare wateringFrequency: string

  @column()
  declare photo: string

  @column()
  declare roomId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>
}
