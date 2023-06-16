import StudentDetailsController from '../models/StudentDetailsModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const LoginAuth = async (req, res, next) => {
    var Email = req.body.Email
    var Password = req.body.Password

    StudentDetailsController.findOne({ Email }).then(user => {
        if (user) {
            bcrypt.compare(Password, user.Password, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    let token = jwt.sign({ Email: user.Email }, process.env.JWT_SECRET)
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

export { LoginAuth }