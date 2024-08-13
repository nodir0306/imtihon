import { createContractType, deleteContractType, getAllContractType, getOneContractType, updateContractType } from "../controllers/contract.type.controller.js";
import { Router } from "express";

const contractTypeRoutes = Router();

contractTypeRoutes
    .post("/contractType/addContractType",createContractType)
    .get("/contractType",getAllContractType)
    .get("/contractType/:contractTypeId",getOneContractType)
    .delete("/contractType/delete/:contractTypeId",deleteContractType)
    .patch("/contractType/update/:contractTypeId",updateContractType)

export default contractTypeRoutes;
