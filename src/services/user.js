import db from "../models";

// Lay thong tin 1 user theo id cua no
export const getOne = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
        // co nghia la lay tat ca thong tin cua id nhung k lay passwod de khong bi lo
        attributes: {
          exclude: ["password", "role_code"],
        },
        // lay du lieu tu bang Role
        include: [
          {
            model: db.Role,
            as: "roleData",
            attributes: ["id", "code", "value"],
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "GOT!" : "User not fount",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
