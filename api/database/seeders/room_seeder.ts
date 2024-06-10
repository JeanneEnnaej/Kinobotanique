import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Room from '../../app/models/room.js'

export default class extends BaseSeeder {
  async run() {
    await Room.createMany([
      { roomName: 'Salle Fraicheur' },
      { roomName: 'Salle Chill' },
      { roomName: 'Salle Cuisine' },
    ])
  }
}
