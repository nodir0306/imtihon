import { addUser,getAllCustomers,getOneCustomer,deleteCustomer,updateCustomer } from "../controllers/customer.controller.js";
import { Router } from "express";

const customerRoutes = Router();

customerRoutes
    .post("/customers/addUser", addUser)
    .get("/customers",getAllCustomers)
    .get("/customer/:customerId",getOneCustomer)
    .delete("/customer/delete/:customerId",deleteCustomer)
    .patch("/customer/update/:customerId",updateCustomer)


export default customerRoutes;
