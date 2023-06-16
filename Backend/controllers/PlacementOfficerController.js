import PlacementOfficerModel from "../models/PlacementOfficerModel.js";
import placementPost from "../models/uploadPlacementPost.js";

const getPlacementOfficerDetails = async (req, res) => {
    try {
        const placementOfficerDetails = await PlacementOfficerModel.findOne({ Email: req.params.Email })
        res.status(200).json(placementOfficerDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getPlacementOfficerDetailsById = async (req, res) => {
    try {
        const placementOfficerDetails = await PlacementOfficerModel.findById(req.params.id)
        res.status(200).json(placementOfficerDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}

const uploadPlacementPostController = (req, res) => {
    try {
        let placement = new placementPost({
            userId: req.body.userId,
            PlacementHeadLine: req.body.PlacementHeadLine,
            PlacementContent: req.body.PlacementContent,
        })
        placement.save().then(() => res.json("placement post uploaded successfully")).catch((err) => res.status(500).json(err))
    } catch (error) {

    }
}

export { getPlacementOfficerDetails, uploadPlacementPostController, getPlacementOfficerDetailsById }