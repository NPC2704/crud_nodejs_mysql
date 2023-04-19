import * as controller from "../controller";
import express from "express";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isModeratorOrAdmin } from "../middlewares/verify_roles";

const router = express.Router();
// PUBLIC ROUTES
//router.get("/", controller.getCurrent); // / -> verifytoken ( dieu kien thoa) => moi qua dc getCurrent

// PRIVATE ROUTES
// những dòng nào nằm dưới dòng router.user(...) thì kiểm tra xong mới dc khong thì nó sẽ k thực hiện dc
router.use(verifyToken);
// khuc nay la sau khi kiem tra token thi se kiem tra co phai la admin khong, neu k la admin thi se tra ve khong phai admin va khong cho dang nhap (day la truong hop test nen la isadmin)
//router.use(isAdmin);
// khuc nay ung giong khuc tren kiem tra admin hoac Modertator
router.use(isModeratorOrAdmin);
router.get("/", controller.getCurrent); // / -> verifytoken ( dieu kien thoa) => moi qua dc getCurrent
module.exports = router;
