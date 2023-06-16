import express from 'express'
const router = express.Router()


import { LoginAuth } from '../controllers/studentAuth.js'

router.post('/LoginStudent', LoginAuth)


export default router