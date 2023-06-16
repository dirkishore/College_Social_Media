import express from 'express'
import { getPlacementOfficerDetails, getPlacementOfficerDetailsById, uploadPlacementPostController } from '../controllers/PlacementOfficerController.js'
const router = express.Router()

router.get("/placementOfficerDetails/:Email", getPlacementOfficerDetails)
router.get("/placementOfficerDetailsById/:id", getPlacementOfficerDetailsById)

router.post("/uploadPlacementPost", uploadPlacementPostController)

export default router 