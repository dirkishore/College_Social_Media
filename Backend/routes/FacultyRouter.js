import express from 'express'
const router = express.Router()

import { followAStaff, followAStudent, getAllFaculties, getFaculty, getFacultyById, getStaffFollowing, getStaffStudents, staffLoginAuth, unFollowAStaff, unFollowAStudent } from '../controllers/FacultyController.js'

router.get('/getAllFaculty', getAllFaculties)
router.get('/getFaculty/:email', getFaculty)
router.get('/getFacultyById/:id', getFacultyById)
router.post("/staffAuth", staffLoginAuth)

router.put("/followstudent/:id", followAStudent)
router.put("/unfollowstudent/:id", unFollowAStudent)

router.put("/followStaff/:id", followAStaff)
router.put("/unfollowStaff/:id", unFollowAStaff)

router.get("/getStaffStudents/:id", getStaffStudents)
router.get("/getStaffFollowings/:id", getStaffFollowing)




export default router