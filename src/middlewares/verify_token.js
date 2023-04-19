// file nay la trung gian giua controller va router
import jwt from "jsonwebtoken";
import { notAuth } from "./handleError";

//req.headers.authoriation la noi luu token tren 1 trang web
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) return notAuth("Require authorization", res);
  const accessToken = token.split(" ")[1];
  // code duoi la kiem tra token co hop le hay khoong, cung nhu kiem tra token con da het han chu
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return notAuth("Access token may be expire or invalid", res);

    req.user = user;
    // ham next la thuc hien buoc ke tiep
    next();
  });
};

export default verifyToken;
