import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Plant from './plant.js'
import Watering from './watering.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare roomId: number

  @column()
  declare roomName: string

  @hasMany(() => Watering)
  declare waterings: HasMany<typeof Watering>

  @hasMany(() => Plant)
  declare plants: HasMany<typeof Plant>
}
