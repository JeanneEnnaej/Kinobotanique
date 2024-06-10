/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const WateringController = () => import('../app/controllers/waterings_controller.js')
const RoomController = () => import('../app/controllers/rooms_controller.js')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/waterings', 'WateringController.store')
router.get('waterings', [WateringController, 'index'])
router.get('rooms', [RoomController, 'index'])
