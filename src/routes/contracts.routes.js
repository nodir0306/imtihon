
import { Router } from "express";
import { createContract, deleteContract, getAllContracts, getOneContract, updateContract } from "../controllers/contracts.controller.js";


const contractRoutes = Router();

contractRoutes
    .post("/contracts/addContracts",createContract)
    .get("/contracts",getAllContracts)
    .get("/contract/:contractId",getOneContract)
    .delete("/contract/delete/:contractId",deleteContract)
    .patch("/contract/update/:contractId",updateContract)


export default contractRoutes;
