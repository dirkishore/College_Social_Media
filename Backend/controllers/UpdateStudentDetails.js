import StudentDetailsModel from '../models/StudentDetailsModel.js'
import fs from 'fs'

const UpdateStudentDetails = (req, res, next) => {
    let studentDetail = new StudentDetailsModel({
        Profile: {
            data: fs.readFileSync('./profile/' + req.file.filename),
            contentType: 'image/png'
        },
        Email: req.body.Email,
        Rollno: req.body.Rollno,
        Name: req.body.Name,
        PhoneNo: req.body.PhoneNo,
        Degree: req.body.Degree,
        Branch: req.body.Branch,
        Year: req.body.year
    })

    var doc = StudentDetailsModel.findOne({ Email: req.body.Email })
    console.log(doc);
    studentDetail.updateOne({ _id: doc._id }, { $set: { studentDetail } }, function (err, result) {
        if (err) { console.log("error occure", err) }
        else {
            console.log(result);
        }
    })
}

export { UpdateStudentDetails }

