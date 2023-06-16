import mongoose from 'mongoose'
const Schema = mongoose.Schema

const StudentDetailsSchema = new Schema({
    Profile: {
        data: Buffer,
        contentType: String
    },
    Email: {
        type: String,
        unique: true,
    },
    Password: {
        type: String,
        min: 6
    },
    Rollno: {
        type: String,
        unique: true
    },
    Name: {
        type: String,
        min: 5,
        max: 30
    },
    Bio: {
        type: String
    },
    PhoneNo: {
        type: Number,
        min: 10
    },
    Degree: {
        type: String,
    },
    Branch: {
        type: String,
    },
    Year: {
        type: String,
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    Staffs: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const StudentDetailsModel = mongoose.model("studentsDetails", StudentDetailsSchema)
export default StudentDetailsModel;