import type { HttpContext } from '@adonisjs/core/http'
import Room from '../models/room.js'

export default class RoomsController {
  async index({ response }: HttpContext) {
    const rooms = await Room.all()
    return response.ok(rooms)
  }
}
