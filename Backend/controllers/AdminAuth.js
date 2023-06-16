import bcrypt from 'bcryptjs'
import { AdminDetails } from '../models/Admin.js'
import jwt from 'jsonwebtoken'

const RegisterAdmin = (req, res, next) => {
    bcrypt.hash(req.body.AdminPassword, 10, (err, hashedPass) => {

        if (err) throw err;

        let admin = new AdminDetails({
            AdminUserName: req.body.AdminUserName,
            AdminPassword: hashedPass
        }).save().then(() => res.json({ message: "Admin Added successfullty" })).catch((err) => res.status(500).json({ err: err.message }))
    })
}

const AdminLoginAuth = (req, res, next) => {
    var UserName = req.body.AdminUserName
    var Password = req.body.AdminPassword

    AdminDetails.findOne({ UserName }).then(user => {
        if (user) {
            bcrypt.compare(Password, user.AdminPassword, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    let token = jwt.sign({ UserName: user.AdminUserName }, 'secretValue')
                    res.json({
                        message: "Login Successfully",
                        token
                    })
                } else {
                    res.json({ message: "Admin password doesn't match" })
                }
            })
        } else {
            res.json({ message: "User not found" })
        }
    })
}

export { RegisterAdmin, AdminLoginAuth }