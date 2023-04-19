import { interalServerError, badRequest } from "../middlewares/handleError";
import * as services from "../services";
import { email, password } from "../helpers/joi_schema";
import joi from "joi";
export const register = async (req, res) => {
  try {
    const { error } = joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    // code kiểm tra đã nhập pass va email chưa, khi code ở đây thì sẽ kiểm tra trước khi vào service sẽ đỡ thời gian load
    const { error } = joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error.details[0]?.message, res);
    const response = await services.login(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
