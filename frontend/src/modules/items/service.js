import request from "../../utils/request";

export const getItemsService = params => request.get("/items", {params});
export const getItemDetailService = id => request.get("/items/" + id);
export const bidService = params => request.post("/bid", params);