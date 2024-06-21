import type { HttpContext } from '@adonisjs/core/http'
import Plant from '../models/plant.js'
import fs from 'node:fs/promises'

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

    const photo = request.file('photo')

    if (photo) {
      if (photo.tmpPath) {
        try {
          const photoBuffer = await fs.readFile(photo.tmpPath)

          plant.photo = photoBuffer
        } catch (error) {
          console.error('Erreur lors de la lecture du fichier', error)
          return response.status(500).send('Erreur lors de la lecture du fichier')
        }
      } else {
        console.error('Chemin temporaire du fichier non défini')
        return response.status(400).send('Chemin temporaire du fichier non défini')
      }
    }

    await plant.save()

    return response.created(plant)
  }

  async getImage({ params, response }: HttpContext) {
    const plantId = params.plantId
    const plant = await Plant.findOrFail(plantId)

    if (!plant.photo) {
      return response.status(404).send('Image not found')
    }

    return response.header('Content-Type', 'image/jpeg').send(plant.photo)
  }
}
