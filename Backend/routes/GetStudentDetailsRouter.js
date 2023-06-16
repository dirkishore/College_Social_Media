import express from 'express'
import { AddStudentDetails, deleteStudentDetails, updateStudentDetails } from '../controllers/StudentDetailsController.js'
const router = express.Router()


import { getStudentDetails, getStudentDetailsById, getAllStudents, followAUser, unFollowAUser, getStudentFriends, followAStaff, unFollowAStaff, getStudentStaffs } from '../controllers/GetStudentDetails.js'

import { verifyToken } from '../middleware/auth.js'

//delete a user
router.delete("/deleteAStudent/:id", deleteStudentDetails)

//get a user
router.post('/getStudentDetails', getStudentDetails)
router.get('/getStudentDetailsbyId/:id', getStudentDetailsById)

//get all users
router.get('/getAllStudents', getAllStudents)

//Follow a user
router.put("/follow/:id", followAUser)

//unFollow a user
router.put("/unfollow/:id", unFollowAUser)

router.get("/friends/:id", getStudentFriends)

//Follow a staff
router.put("/followStaff/:id", followAStaff)

//unfollow a staff
router.put("/unfollowStaff/:id", unFollowAStaff)

router.get("/staffs/:id", getStudentStaffs)


export default router