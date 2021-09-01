import request from "../../utils/request";

export const getItemsService = param => request.get("/items", {params: param});