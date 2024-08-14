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
import {writePostSql} from "./postgres/postgres.js"


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
server.get('/overduePayments', async (req, res) => {
    try {
        const overduePayments = await writePostSql(`
            SELECT 
                c.name AS customer_name, 
                p.name AS product_name, 
                cn.id AS contract_id, 
                (cn.monthly_payment * (1 + ct.percentage / 100.0)) AS amount_due,
                (current_date - (cn.contract_date + INTERVAL '1 day' * ct.duration)) AS days_overdue
            FROM contracts cn
            JOIN customer c ON c.id = cn.customer_id
            JOIN contract_type ct ON ct.id = cn.contract_type_id
            JOIN orders o ON o.id = cn.order_id
            JOIN order_items oi ON oi.order_id = o.id
            JOIN product p ON p.id = oi.product_id
            WHERE current_date > (cn.contract_date + INTERVAL '1 day' * ct.duration)
        `);

        res.send({
            message: "Success",
            data: overduePayments
        });
    } catch (error) {
        res.status(500).send({
            message: "erorrrrrrrrrrrrrrrrrr",
            error: error.message
        });
    }
});


server.get('/overdueContract', async (req, res) => {
    try {
        const overduePayments = await writePostSql('SELECT * FROM overdue_payments');
        res.send({
            message: "Success",
            data: overduePayments
        });
    } catch (error) {
        res.status(500).send({
            message: "errrrrrrrrrrrrrrrrrrrrrrrrrrrr",
            error: error.message
        });
    }
});

server.listen(appConfig.port, () => {
    console.log(`Server is running on ${appConfig.host}:${appConfig.port} ....`);
});
