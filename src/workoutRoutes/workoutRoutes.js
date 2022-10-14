import express from 'express'
import checkAuth from '../middleware/checkAuth.js'
const router = express.Router()
import { login, obras, registro, favoritos, eliminarFavoritos } from '../workoutController/workoutController.js'

router.post('/login', login)
router.post('/obras', checkAuth, obras)
router.post('/registro', registro)
router.get('/favoritos',checkAuth, favoritos)
router.delete('/favoritos/:id_obra', checkAuth, eliminarFavoritos)

export default router; 