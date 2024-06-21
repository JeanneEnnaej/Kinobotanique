import type { HttpContext } from '@adonisjs/core/http'
import Plant from '../models/plant.js'
import Application from '@ioc:Adonis/core/Application'

export default class PlantsController {
  async index({ response, params }: HttpContext) {
    const roomId = params.roomId
    const plants = await Plant.query().where('room_id', roomId)
    return response.ok(plants)
  }

  async store({ request, response }: HttpContext) {
    const plant = new Plant()
    plant.name = request.input('name')
    plant.roomId = request.input('roomId')
    plant.wateringFrequency = request.input('wateringFrequency')

    const photo = request.file('photo', {
      extnames: ['jpg', 'png', 'jpeg'],
      size: '2mb',
    })

    if (photo) {
      const fileName = `${Date.now()}.${photo.extname}`
      await photo.move(Application.publicPath('uploads'), {
        name: fileName,
        overwrite: true,
      })
      plant.photo = `uploads/${fileName}`
    }

    await plant.save()
    return response.created(plant)
  }
}
