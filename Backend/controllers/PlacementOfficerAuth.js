import bcrypt from 'bcryptjs'
import PlacementOfficerModel from '../models/PlacementOfficerModel.js'
import fs from 'fs'
import jwt from 'jsonwebtoken'

const registerPlacementOfficer = (req, res, next) => {
    bcrypt.hash(req.body.Password, 10, (err, hashedPass) => {

        if (err) throw err;

        let PlacementOfficer = new PlacementOfficerModel({
            Profile: {
                data: fs.readFileSync('./public/assets/profile/' + req.file.filename),
                contentType: 'image/png'
            },
            Email: req.body.Email,
            Password: hashedPass,
            Name: req.body.Name,
            Experience: req.body.Experience,
            Specialization: req.body.Specialization
        })
        PlacementOfficer.save().then(() => res.json({ message: "placementOfficer Added successfullty" })).catch((err) => res.status(500).json({ err: err.message }))
    })
}


const PlacementOfficerLoginAuth = (req, res, next) => {
    var Email = req.body.Email
    var Password = req.body.Password

    PlacementOfficerModel.findOne({ Email }).then(user => {
        if (user) {
            bcrypt.compare(Password, user.Password, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    let token = jwt.sign({ Email: user.Email }, 'secretValue')
                    res.json({
                        message: "Login Successfully",
                        token,
                        user
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

export { registerPlacementOfficer, PlacementOfficerLoginAuth }