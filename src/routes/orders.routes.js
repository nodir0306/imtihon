import { createOrder, deleteOrder, getAllOrders, getAllOrdersWithCustomerId, getOneOrder, updateOrder} from "../controllers/orders.controller.js";
import { Router } from "express";

const orderRoutes = Router();

orderRoutes
    .post("/orders/addOrder",createOrder)
    .get("/orders",getAllOrders)
    .get("/orders/:customerId",getAllOrdersWithCustomerId)
    .get("/order/:orderId",getOneOrder)
    .delete("/order/delete/:orderId",deleteOrder)
    .patch("/order/update/:orderId",updateOrder)
export default orderRoutes;
