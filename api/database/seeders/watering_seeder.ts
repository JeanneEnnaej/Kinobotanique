import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Watering from '../../app/models/watering.js'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Watering.createMany([
      { roomId: 1, wateringDate: DateTime.local().minus({ days: 1 }), wateringUser: 'Gregoire' },
      { roomId: 2, wateringDate: DateTime.local().minus({ days: 6 }), wateringUser: 'Jeanne' },
      {
        roomId: 3,
        wateringDate: DateTime.local().minus({ days: 3 }),
        wateringUser: 'Laura',
      },
      { roomId: 1, wateringDate: DateTime.local().minus({ days: 1 }), wateringUser: 'Jeanne' },
      {
        roomId: 2,
        wateringDate: DateTime.local().minus({ days: 4 }),
        wateringUser: 'Laura',
      },
      {
        roomId: 3,
        wateringDate: DateTime.local().minus({ days: 9 }),
        wateringUser: 'Laura',
      },
    ])
  }
}
