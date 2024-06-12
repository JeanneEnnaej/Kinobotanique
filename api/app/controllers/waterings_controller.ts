import type { HttpContext } from '@adonisjs/core/http'
import Watering from '../models/watering.js'
import { DateTime } from 'luxon'

export default class WateringsController {
  async index({ response }: HttpContext) {
    const waterings = await Watering.all()
    return response.ok(waterings)
  }

  async indexByRoom({ response, params }: HttpContext) {
    const roomId = params.roomId
    const waterings = await Watering.query().where('room_id', roomId)
    return response.ok(waterings)
  }

  async createstore({ request, response }: HttpContext) {
    const roomId = request.input('roomId')
    const wateringUser = request.input('wateringUser')
    const wateringDate = request.input('wateringDate')

    const watering = new Watering()
    watering.roomId = roomId
    watering.wateringUser = wateringUser
    watering.wateringDate = DateTime.fromISO(wateringDate)

    await watering.save()

    return response.created(watering)
  }

  async destroy({ params, response }: HttpContext) {
    const watering = await Watering.findOrFail(params.id)
    await watering.delete()
    return response.ok({ message: 'Arrosage supprimé avec succès' })
  }
}
