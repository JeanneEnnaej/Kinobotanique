import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.runSeeder(await import('../room_seeder.ts'))
    await this.runSeeder(await import('../plant_seeder.ts'))
    await this.runSeeder(await import('../watering_seeder.ts'))
  }
}
