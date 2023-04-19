import * as controller from "../controller";
import express from "express";
import verifyToken from "../middlewares/verify_token";
import { isAdmin } from "../middlewares/verify_roles";
import uploadCloud from "../middlewares/uploader";
const router = express.Router();

//Public routes
router.get("/", controller.getBooks);

//private routes
router.use(verifyToken);
router.use(isAdmin);
router.post("/", uploadCloud.single("image"), controller.createNewBook);

// chay qua uploadCloud.single("image") chayj qua ham nay de lay data roi truyen vao controller
export default router;
