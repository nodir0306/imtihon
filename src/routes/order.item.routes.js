
import { Router } from "express";
import { createOrderItem, deleteOrderItem, getAllOrderItems, getOneOrderItem, updateOrderItem } from "../controllers/order.item.controller.js";

const orederItemRoutes = Router();

orederItemRoutes
    .post("/orderItem/addOrderItem",createOrderItem)
    .get("/orderItems",getAllOrderItems)
    .get("/orderItem/:orderItemId",getOneOrderItem)
    .delete("/orderItem/delete/:orderItemId",deleteOrderItem)
    .patch("/orderItem/update/:orderItemId",updateOrderItem)


export default orederItemRoutes;
