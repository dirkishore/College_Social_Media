import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PlacementOfficerSchema = new Schema({
    Profile: {
        data: Buffer,
        contentType: String
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        min: 6
    },
    Name: {
        type: String,
        min: 5,
        max: 30
    },
    Experience: {
        type: String
    },
    Specialization: {
        type: String
    }

}, { timestamps: true })

const PlacementOfficerModel = mongoose.model("PlacementOfficer", PlacementOfficerSchema)
export default PlacementOfficerModel;