import { findAllProducts } from "../controllers/find.proucts.controller.js"
import { Router } from "express";

const findProductsRoutes = Router();

findProductsRoutes.get("/search", findAllProducts);

export default findProductsRoutes;
