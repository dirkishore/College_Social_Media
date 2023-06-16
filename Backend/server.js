import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

import StudentAuthRouter from "./routes/StudentAuth.js";
import StudentDetailsRouter from "./routes/GetStudentDetailsRouter.js";
import PostRouter from "./routes/DisplayAllPostRouter.js";
import AdminRouter from "./routes/AdminAuth.js";
import updatePostStatusRouter from "./routes/UpdatePostStatusRouter.js";
import getAllFacultiesRouter from "./routes/FacultyRouter.js";
import PlacementOfficerRouter from "./routes/PlacementOfficerRouter.js";
import updatePostRouter from "./routes/UpdatePostRouter.js";
import chats from "./routes/ConversationsRouter.js";
import message from "./routes/MessagesRouter.js";

import {
  AddStaffDetails,
  updateStaffProfile,
} from "./controllers/FacultyController.js";
import {
  AddStudentDetails,
  updateStudentDetails,
  updateStudentProfile,
} from "./controllers/StudentDetailsController.js";
import {
  CollegeEventsUpload,
  UploadPhoto,
} from "./controllers/PostUploadController.js";
import { UploadVideoController } from "./controllers/PostUploadController.js";
import {
  onArticleComment,
  onPostComment,
  onVideoComment,
  updatePost,
} from "./controllers/UpdatePostController.js";

import { verifyToken } from "./middleware/auth.js";
import {
  PlacementOfficerLoginAuth,
  registerPlacementOfficer,
} from "./controllers/PlacementOfficerAuth.js";

//configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(import.meta.url);
console.log(path.join(__dirname, "public/assets"));

//middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

dotenv.config();
const url = process.env.MONGOURL;
const port = process.env.PORT;

mongoose.set("strictQuery", true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected to Database");
});

//File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "Profile") {
      cb(null, "./public/assets/profile/");
    } else if (file.fieldname === "staffProfilePic") {
      cb(null, "./public/assets/StaffProfilePic/");
    } else if (file.fieldname === "Photo") {
      cb(null, "./public/assets/post/photo/");
    } else if (file.fieldname === "Video") {
      cb(null, "./public/assets/post/video/");
    } else if (file.fieldname === "Poll") {
      cb(null, "./public/assets/post/poll/");
    } else if (file.fieldname === "Article") {
      cb(null, "./public/assets/post/article/");
    } else if (file.fieldname === "CollegeEvents") {
      cb(null, "./public/assets/post/collegeEvents/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });

//Router With Files
app.post(
  "/student/addStudentDetails",
  upload.single("Profile"),
  AddStudentDetails
);
//update Student Details
app.put("/student/updateStudentDetails/:id", updateStudentDetails);
app.put(
  "/student/updateStudentProfile/:id",
  upload.single("Profile"),
  updateStudentProfile
);
app.put(
  "/staff/updateStaffProfile/:id",
  upload.single("staffProfilePic"),
  updateStaffProfile
);

app.post("/Staff/AddStaff", upload.single("staffProfilePic"), AddStaffDetails);
app.post(
  "/placementOfficer/AddPlacementOfficer",
  upload.single("Profile"),
  registerPlacementOfficer
);

app.post("/post/UploadPost", upload.single("Photo"), UploadPhoto);
app.post("/post/UploadVideo", upload.single("Video"), UploadVideoController);
app.post(
  "/post/uploadCollegeEvents",
  upload.single("CollegeEvents"),
  CollegeEventsUpload
);

app.put("/post/onPostComment", upload.single("Profile"), onPostComment);
app.put("/post/onVideoComment", upload.single("Profile"), onVideoComment);
app.put("/post/onArticleComment", upload.single("Profile"), onArticleComment);

app.use("/student", StudentDetailsRouter);
app.use("/student", StudentAuthRouter);
app.use("/Faculty", getAllFacultiesRouter);

app.use("/placementOfficerAuth", PlacementOfficerLoginAuth);
app.use("/placementOfficer", PlacementOfficerRouter);

app.use("/post", PostRouter);
app.use("/post", updatePostRouter);
app.use("/poll", updatePostRouter);
app.use("/admin", AdminRouter);
app.use("/chat", chats);
app.use("/message", message);

app.use("/post", updatePostStatusRouter);

app.use("/auth", verifyToken);

app.listen(port, () => {
  console.log("listening on port 5000");
});
