import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Plant from '../../app/models/plant.js'
import Room from '../../app/models/room.js'
import fs from 'node:fs'
import path from 'node:path'

import { fileURLToPath } from 'node:url'

// Pour obtenir le chemin du répertoire actuel
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Fonction pour lire une image et la convertir en Buffer
function readImage(fileName: string): Buffer {
  return fs.readFileSync(path.join(dirname, 'images', fileName))
}

export default class PlantSeeder extends BaseSeeder {
  async run() {
    // Récupérez les pièces existantes
    const rooms = await Room.all()

    // Ajoutez des plantes avec des images
    await Plant.createMany([
      {
        name: 'Misère',
        roomId: 1,
        wateringFrequency: 'Weekly',
        photo: readImage('misere.jpg'),
      },
      {
        name: 'Coleus',
        roomId: 1,
        wateringFrequency: 'Bi-weekly',
        photo: readImage('coleus.jpg'),
      },
      {
        name: 'Syngonium',
        roomId: 1,
        wateringFrequency: 'Monthly',
        photo: readImage('syngonium.jpg'),
      },
    ])
  }
}
