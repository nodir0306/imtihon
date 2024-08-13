import {addCategory,deleteCategory,getAllCategory, getOneCategory, updateCategory} from "../controllers/category.controller.js";
import { Router } from "express";

const categoryRoutes = Router();

categoryRoutes
    .post("/category/addCategory",addCategory)
    .get("/categories",getAllCategory)
    .get("/category/:categoryId",getOneCategory)
    .delete("/category/delete/:categoryId",deleteCategory)
    .patch("/category/update/:categoryId",updateCategory)

export default categoryRoutes;
