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

router.get('waterings', [WateringController, 'index'])
router.get('/rooms/:roomId/waterings', [WateringController, 'indexByRoom'])
router.post('waterings', [WateringController, 'createstore'])

router.get('rooms', [RoomController, 'index'])
router.post('rooms', [RoomController, 'createstore'])
