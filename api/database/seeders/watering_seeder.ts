import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Watering from '../../app/models/watering.js'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Watering.createMany([
      { roomId: 1, wateringDate: DateTime.local().minus({ days: 1 }), watering_user: 'John Doe' },
      { roomId: 2, wateringDate: DateTime.local().minus({ days: 2 }), watering_user: 'Jane Smith' },
      {
        roomId: 3,
        wateringDate: DateTime.local().minus({ days: 3 }),
        watering_user: 'Alice Brown',
      },
    ])
  }
}
