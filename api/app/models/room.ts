import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare roomId: number

  @column()
  declare roomName: string
}
