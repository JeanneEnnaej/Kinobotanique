import type { HttpContext } from '@adonisjs/core/http'
import Room from '../models/room.js'

export default class RoomsController {
  async index({ response }: HttpContext) {
    const rooms = await Room.all()
    return response.ok(rooms)
  }

  async createstore({ request, response }: HttpContext) {
    const roomName = request.input('roomName')
    console.log('toto')
    if (!roomName || typeof roomName !== 'string') {
      return response.badRequest({ message: 'Invalid room name' })
    }

    const room = new Room()
    room.roomName = roomName
    await room.save()

    return response.created(room)
  }
}
