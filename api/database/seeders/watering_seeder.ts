import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Watering from '../../app/models/watering.js'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Watering.createMany([
      { roomId: 1, wateringDate: DateTime.local().minus({ days: 1 }), wateringUser: 'John Doe' },
      { roomId: 2, wateringDate: DateTime.local().minus({ days: 6 }), wateringUser: 'Jane Smith' },
      {
        roomId: 3,
        wateringDate: DateTime.local().minus({ days: 3 }),
        wateringUser: 'Alice Brown',
      },
      { roomId: 1, wateringDate: DateTime.local().minus({ days: 1 }), wateringUser: 'Jane Smith' },
      {
        roomId: 2,
        wateringDate: DateTime.local().minus({ days: 4 }),
        wateringUser: 'Alice Brown',
      },
      {
        roomId: 3,
        wateringDate: DateTime.local().minus({ days: 9 }),
        wateringUser: 'Alice Brown',
      },
    ])
  }
}
