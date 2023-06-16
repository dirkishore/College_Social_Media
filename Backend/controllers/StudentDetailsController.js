import StudentDetailsModel from '../models/StudentDetailsModel.js'
import fs from 'fs'
import bcryptjs from 'bcryptjs'
import bcrypt from 'bcrypt'
import { ObjectID, ObjectId } from 'mongodb'

const AddStudentDetails = (req, res, next) => {
    bcryptjs.hash(req.body.Password, 10, (err, hashedPass) => {

        if (err) throw err

        let studentDetail = new StudentDetailsModel({
            Profile: {
                data: fs.readFileSync('./public/assets/profile/' + req.file.filename),
                contentType: 'image/png'
            },
            Email: req.body.Email,
            Password: hashedPass,
            Rollno: req.body.Rollno,
            Name: req.body.Name,
            PhoneNo: req.body.PhoneNo,
            Degree: req.body.Degree,
            Branch: req.body.Branch,
            Year: req.body.Year
        })
        studentDetail.save().then(() => res.json({ message: "details Added successfully" }))
            .catch((err) => { console.log(err), res.json({ message: err }) })
    })
}

const updateStudentDetails = async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.Password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.Password = await bcrypt.hash(req.body.Password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        StudentDetailsModel.findByIdAndUpdate(req.params.id, { $set: req.body }).then((result) => res.status(200).json({ result: "updated successfully" })).catch((err) => res.status(400).json({ err }))
    } else {
        return res.status(500).json("You can update only your account")
    }
}

const updateStudentProfile = (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {


        StudentDetailsModel.findByIdAndUpdate(req.params.id, {
            $set: {
                Profile: {
                    data: fs.readFileSync('./public/assets/profile/' + req.file.filename),
                    contentType: 'image/png'
                }
            }
        }).then((result) => res.status(200).json("profile updated successfully")).catch((err) => res.json(err))
    } else {
        return res.status(500).json("You can update only your account")
    }
}

const deleteStudentDetails = async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        StudentDetailsModel.deleteOne({ _id: req.params.id }).then((result) => res.status(200).json({ result: "user deleted successfully" })).catch((err) => res.status(400).json(err))
    } else {
        return res.status(500).json("You can delete only your account")
    }
}


export { AddStudentDetails, updateStudentDetails, updateStudentProfile, deleteStudentDetails }