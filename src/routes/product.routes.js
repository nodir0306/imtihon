import { addProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct} from "../controllers/product.controller.js";
import { Router } from "express";

const productRoutes = Router();

productRoutes
    .post("/product/addProduct",addProduct)
    .get("/products",getAllProducts)
    .get("/product/:productId",getOneProduct)
    .delete("/product/delete/:productId",deleteProduct)
    .patch("/product/update/:productId",updateProduct)


export default productRoutes;
