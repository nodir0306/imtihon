import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import url from 'url';
import { appConfig } from "./config/app.config.js";
import cors from "cors";
import customerRoutes from "./routes/customer.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import contractTypeRoutes from "./routes/contract-type.routes.js";
import orederItemRoutes from "./routes/order.item.routes.js";
import contractRoutes from "./routes/contracts.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import findProductsRoutes from "./routes/find.product.routes.js";

const server = express();
server.set("view engine", "ejs");

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(customerRoutes);
server.use(productRoutes);
server.use(categoryRoutes);
server.use(orderRoutes);
server.use(contractTypeRoutes);
server.use(orederItemRoutes);
server.use(contractRoutes);
server.use(paymentRoutes);
server.use(findProductsRoutes)
server.listen(appConfig.port, () => {
    console.log(`Server is running on ${appConfig.host}:${appConfig.port} ....`);
});
