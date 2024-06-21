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
const PlantController = () => import('../app/controllers/plants_controller.js')

router.get('waterings', [WateringController, 'index'])
router.get('/rooms/:roomId/waterings', [WateringController, 'indexByRoom'])
router.post('waterings', [WateringController, 'store'])
router.delete('/waterings/:id', [WateringController, 'destroy'])

router.get('rooms', [RoomController, 'index'])
router.post('rooms', [RoomController, 'store'])
router.get('/rooms/:id', [RoomController, 'show'])

router.get('/rooms/:roomId/plants', [PlantController, 'index'])
router.post('plants', [PlantController, 'store'])
router.get('/plants/:plantId/image', [PlantController, 'getImage'])
