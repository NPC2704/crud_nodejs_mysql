import * as services from "../services";
const cloudinary = require("cloudinary").v2;
import { interalServerError, badRequest } from "../middlewares/handleError";
import {
  title,
  image,
  category_code,
  price,
  available,
  bid,
} from "../helpers/joi_schema";
import joi from "joi";
export const getBooks = async (req, res) => {
  try {
    const response = await services.getBooks(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
// neu nhu lay data tu nguoi dung thi req.query , con lay data tu duoi len thi tu req.body

// create books
export const createNewBook = async (req, res) => {
  try {
    const fileData = req.file;
    const { error } = joi
      .object({ title, image, category_code, price, available })
      .validate({ ...req.body, image: fileData?.path });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }

    const response = await services.createBooks(req.body, fileData);

    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

//Update Book
export const updateBooks = async (req, res) => {
  try {
    const fileData = req.file;
    const { error } = joi.object({ bid }).validate(req.body);
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }

    const response = await services.updateBooks(req.body, fileData);

    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
