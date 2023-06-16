import StaffDetailsModel from '../models/StaffModule.js'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import StudentDetailsModel from '../models/StudentDetailsModel.js'


const AddStaffDetails = (req, res, next) => {
    bcrypt.hash(req.body.staffPassword, 10, (err, hashedPass) => {

        if (err) throw err
        let StaffDetails = new StaffDetailsModel({
            staffProfilePic: {
                data: fs.readFileSync('./public/assets/StaffProfilePic/' + req.file.filename),
                contentType: 'image/png'
            },
            staffName: req.body.staffName,
            staffEmail: req.body.staffEmail,
            staffPassword: hashedPass,
            staffDepartment: req.body.staffDepartment
        })
        StaffDetails.save().then(() => res.json({ message: "Staff details Added successfully" }))
            .catch((err) => { console.log(err), res.json({ message: err }) })
    })
}

const getAllFaculties = (req, res, next) => {
    StaffDetailsModel.find().then((result) => res.json({ result })).catch((err) => res.json({ err }))
}

const getFaculty = (req, res, next) => {
    StaffDetailsModel.findOne({ staffEmail: req.params.email }).then((result) => res.json(result)).catch((err) => res.json(err))
}
const getFacultyById = (req, res, next) => {
    StaffDetailsModel.findOne({ _id: req.params.id }).then((result) => res.json(result)).catch((err) => res.json(err))
}

const updateStaffProfile = (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {


        StaffDetailsModel.findByIdAndUpdate(req.params.id, {
            $set: {
                staffProfilePic: {
                    data: fs.readFileSync('./public/assets/profile/' + req.file.filename),
                    contentType: 'image/png'
                }
            }
        }).then((result) => res.status(200).json("profile updated successfully")).catch((err) => res.json(err))
    } else {
        return res.status(500).json("You can update only your account")
    }
}

const staffLoginAuth = async (req, res, next) => {
    var staffEmail = req.body.staffEmail
    var staffPassword = req.body.staffPassword

    StaffDetailsModel.findOne({ staffEmail }).then(user => {
        if (user) {
            bcrypt.compare(staffPassword, user.staffPassword, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    let token = jwt.sign({ staffEmail: user.staffEmail }, process.env.JWT_SECRET)
                    res.status(200).json({
                        message: "Login Successfully",
                        token,
                        user
                    })
                } else {
                    res.status(200).json({ message: "password doesn't match" })
                }
            })
        } else {
            res.status(200).json({ message: "User not found" })
        }
    })
}

let followAStudent = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await StudentDetailsModel.findById(req.params.id)
            const currentUser = await StaffDetailsModel.findById(req.body.userId)

            if (!user.Staffs.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { students: req.params.id } });
                res.status(200).json("user has been followed")
            } else {
                res.status(200).json("You already following this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(400).json("You can't follow yourself")
    }
}

let unFollowAStudent = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await StudentDetailsModel.findById(req.params.id)
            const currentUser = await StaffDetailsModel.findById(req.body.userId)

            if (user.Staffs.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { students: req.params.id } });
                res.status(200).json("user has been unfollowed")
            } else {
                res.status(403).json("You dont follow this user")
            }
        } catch (error) {
            res.status(500).json(err)
        }

    } else {
        res.status(400).json("You dont follow this user")
    }
}

const followAStaff = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await StaffDetailsModel.findById(req.params.id)
            const currentUser = await StaffDetailsModel.findById(req.body.userId)

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("user has been followed")
            } else {
                res.status(200).json("You already following this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(400).json("You can't follow yourself")
    }
}

let unFollowAStaff = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await StaffDetailsModel.findById(req.params.id)
            const currentUser = await StaffDetailsModel.findById(req.body.userId)

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("user has been unfollowed")
            } else {
                res.status(403).json("You dont follow this user")
            }
        } catch (error) {
            res.status(500).json(err)
        }

    } else {
        res.status(400).json("You dont follow this user")
    }
}

const getStaffStudents = async (req, res, next) => {
    try {
        const user = await StaffDetailsModel.findById(req.params.id)
        const friends = await Promise.all(
            user.students.map(friendId => {
                return StudentDetailsModel.findById(friendId)
            })
        )
        let friendList = []
        friends.map(friend => {
            const { _id, Profile, Name } = friend
            friendList.push({ _id, Profile, Name })
        })
        res.status(200).json(friendList)
    } catch (error) {
        console.log(error);
    }
}

const getStaffFollowing = async (req, res) => {
    try {
        const user = await StaffDetailsModel.findById(req.params.id)
        const staffs = await Promise.all(
            user.following.map(staffId => {
                return StaffDetailsModel.findById(staffId)
            })
        )
        let staffList = []
        staffs.map(friend => {
            const { _id, staffProfilePic, staffName } = friend
            staffList.push({ _id, staffProfilePic, staffName })
        })
        res.status(200).json(staffList)
    } catch (error) {
        console.log(error);
    }
}

export { AddStaffDetails, getAllFaculties, getFaculty, getFacultyById, staffLoginAuth, followAStudent, unFollowAStudent, followAStaff, unFollowAStaff, getStaffStudents, updateStaffProfile, getStaffFollowing }
