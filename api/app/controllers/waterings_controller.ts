import type { HttpContext } from '@adonisjs/core/http'
import Watering from '../models/watering.js'

export default class WateringsController {
  async index({ response }: HttpContext) {
    const waterings = await Watering.all()
    return response.ok(waterings)
  }
  // async store({ request, response }: HttpContext) {
  //   const wateringSchema = schema.create({
  //     roomId: schema.number([rules.exists({ table: 'rooms', column: 'room_id' })]),
  //     userName: schema.string({ trim: true }),
  //     wateringDate: schema.date({ format: 'yyyy-MM-dd HH:mm:ss' }, [
  //       rules.beforeOrEqual(DateTime.local().toSQL()),
  //     ]),
  //   })

  //   const payload = await request.validate({ schema: wateringSchema })

  //   const watering = await Watering.create(payload)

  //   return response.created(watering)
  // }
}
