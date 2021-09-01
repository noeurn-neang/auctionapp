import request from "../../utils/request";

export const loginService = param => request.post("/login", param);