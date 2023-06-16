import StudentDetailsModel from '../models/StudentDetailsModel.js'
import StaffDetailsModel from '../models/StaffModule.js'

let getAllStudents = (req, res, next) => {
    StudentDetailsModel.find().then((result) => res.json({ result })).catch((err) => res.json((err)))
}

let getStudentDetails = (req, res, next) => {
    let Email = req.body.Email
    StudentDetailsModel.findOne({ Email }).then((result) => res.json({ result })).catch((err) => res.json({ message: err }))
}

let getStudentDetailsById = (req, res, next) => {
    StudentDetailsModel.findById(req.params.id).then((result) => res.status(200).json({ result })).catch((err) => res.status(400).json(err))
}

let followAUser = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await StudentDetailsModel.findById(req.params.id)
            const currentUser = await StudentDetailsModel.findById(req.body.userId)

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

let unFollowAUser = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await StudentDetailsModel.findById(req.params.id)
            const currentUser = await StudentDetailsModel.findById(req.body.userId)

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

const getStudentFriends = async (req, res, next) => {
    try {
        const user = await StudentDetailsModel.findById(req.params.id)
        const friends = await Promise.all(
            user.following.map(friendId => {
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



const followAStaff = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await StaffDetailsModel.findById(req.params.id)
            const currentUser = await StudentDetailsModel.findById(req.body.userId)

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { Staffs: req.params.id } });
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

const unFollowAStaff = async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await StaffDetailsModel.findById(req.params.id)
            const currentUser = await StudentDetailsModel.findById(req.body.userId)

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { Staffs: req.params.id } });
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

const getStudentStaffs = async (req, res, next) => {
    try {
        const user = await StudentDetailsModel.findById(req.params.id)
        const staffs = await Promise.all(
            user.Staffs.map(staffId => {
                return StaffDetailsModel.findById(staffId)
            })
        )
        let staffList = []
        staffs.map(staff => {
            const { _id, staffProfilePic, staffName } = staff
            staffList.push({ _id, staffProfilePic, staffName })
        })
        res.status(200).json(staffList)
    } catch (error) {
        console.log(error);
    }
}

export { getStudentDetails, getStudentDetailsById, getAllStudents, followAUser, unFollowAUser, getStudentFriends, followAStaff, unFollowAStaff, getStudentStaffs }