import { writePostSql } from "../postgres/postgres.js";
export async function findAllProducts(req, res) {
    try {
        const searchTerm = req.query["searching-product"];

        let query = `
            SELECT 
                product.id, 
                product.name, 
                product.price, 
                product.quantity, 
                product.category_id, 
                product.image_url, 
                category.name AS category_name
            FROM 
                product
            LEFT JOIN 
                category ON product.category_id = category.id
        `;


        if (searchTerm) {
            query += ` WHERE product.name ILIKE '%${searchTerm}%'`;
        }

        const products = await writePostSql(query);
        res.status(200).send({foundedProducts: products});
    } catch (error) {
        res.status(404).send({ error: "product not found" });
    }
}
