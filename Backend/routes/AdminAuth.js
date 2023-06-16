import express from 'express'
const router = express.Router()

import { RegisterAdmin, AdminLoginAuth } from '../controllers/AdminAuth.js'

router.post('/AddAdmin', RegisterAdmin)
router.post('/GetAdmin', AdminLoginAuth)


export default router 