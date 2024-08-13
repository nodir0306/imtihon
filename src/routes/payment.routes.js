
import { Router } from "express";
import { createPayment, deletePayment, getAllPayments, getOnePayment, updatePayment } from "../controllers/payment.controller.js";

const paymentRoutes = Router();

paymentRoutes
    .post("/payment/addPayment", createPayment)
    .get("/payments",getAllPayments)
    .get("/payment/:paymentId",getOnePayment)
    .delete("/payment/delete/:paymentId",deletePayment)
    .patch("/payment/update/:paymentId",updatePayment)


export default paymentRoutes;
