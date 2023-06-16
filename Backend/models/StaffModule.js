import mongoose from "mongoose";
const Shema = mongoose.Schema

const StaffShema = new Shema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,

    },
    staffProfilePic: {
        data: Buffer,
        contentType: String
    },
    staffName: {
        type: String,
        required: true,
        min: 5,
        max: 25
    },
    staffEmail: {
        type: String,
        required: true
    },
    staffPassword: {
        type: String,
        required: true
    },
    staffDepartment: {
        type: String,
        required: true
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    students: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const StaffDetailsModel = mongoose.model("StaffDetails", StaffShema)
export default StaffDetailsModel;