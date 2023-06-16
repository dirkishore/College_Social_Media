import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    AdminUserName: {
        type: String,
        required: true,
        unique: true
    },
    AdminPassword: {
        type: String,
        required: true
    }
}, { timestamps: true })

const AdminDetails = mongoose.model("AdminLoginDetails", AdminSchema)
export { AdminDetails }