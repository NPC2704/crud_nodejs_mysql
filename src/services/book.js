import db from "../models";
import { Op } from "sequelize";
import { v4 as generateId } from "uuid";
const cloudinary = require("cloudinary").v2;
//READ
export const getBooks = ({ page, limit, order, name, available, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, rest: true };
      // offset la lay vi tri cua trang
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      // lay so luong sach
      const flimit = +limit || +process.env.LIMIT_BOOK;
      //
      queries.offset = offset * flimit;
      queries.limit = flimit;
      //sap xep theo thu tu
      if (order) queries.order = [order];
      if (name) query.title = { [Op.substring]: name };
      // tim so luong trong khoang
      if (available) query.available = { [Op.between]: available };
      // ham tim kiem
      const response = await db.Book.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          exclude: ["category_code", "description"],
        },
        include: [
          {
            model: db.Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            as: "categoryData",
          },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "Cannot found books",
        bookData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
//CREATE
export const createBooks = (body, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(124);
      const response = await db.Book.findOrCreate({
        where: { title: body?.title },
        defaults: {
          ...body,
          id: generateId(),
          image: fileData?.path,
        },
      });
      console.log(1246);
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Create" : "Cannot create new books",
      });
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    }
  });

//UPDATE
export const updateBooks = ({ id, ...body }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      if (fileData) body.image = fileData?.path;
      const response = await db.Book.update(body, {
        where: { id },
      });
      console.log(1246);
      resolve({
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} book updated`
            : "Cannot update new books/Book ID not found",
      });
      if (fileData && response[0] === 0)
        cloudinary.uploader.destroy(fileData.filename);
    } catch (error) {
      reject(error);
      if (fileData && !response[1])
        cloudinary.uploader.destroy(fileData.filename);
    }
  });
