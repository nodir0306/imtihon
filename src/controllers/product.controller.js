import { writePostSql } from "../postgres/postgres.js";
import formidable from "formidable";

import path from "path";
import { unlink } from "fs";

const form = formidable({
    keepExtensions: true,
    uploadDir: "uploads"
});

export async function addProduct(req, res) {
    try {
            const [fields,files] = await form.parse(req)

            const newProduct = await writePostSql(
                "INSERT INTO product(name,price,quantity,category_id,image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                fields.name[0],
                fields.price[0],
                fields.quantity[0],
                fields.category_id[0],
                files.image_url[0].newFilename,
            );

            res.status(201).send({
                message: 'Product created',
                data: newProduct   
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'Product adding error',
            error: error.message
        });
    }
}

export async function getAllProducts(req, res) {
    try {
         

           const allProducts =  await writePostSql("SELECT * FROM product");

            res.status(200).send({
                message: 'ok',
                data: allProducts
         
        });
    } catch (error) {
        res.status(404).send({
            message: 'Product get error',
            error: error.message
        });
    }
}

export async function getOneProduct(req, res) {
    try {
            const currentProductId = req.params?.productId

            const currentProduct = await writePostSql("SELECT * FROM product WHERE id = $1",currentProductId);

            res.status(200).send({
                message: 'ok',
                data: currentProduct    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'Product get error',
            error: error.message
        });
    }
}


export async function deleteProduct(req, res) {
    try {

         
            const currentProductId = req.params?.productId
            const currentProduct = await writePostSql("SELECT * FROM product WHERE id = $1",currentProductId)
            const productImage = currentProduct[0].image_url;
   
            unlink(path.join(process.cwd(),"uploads",productImage),(err)=>{console.log(err)})
            await writePostSql("DELETE FROM product WHERE id = $1",currentProductId);

            res.status(200).send({
                message: 'Product succes deleted',
         
        });
    } catch (error) {
        res.status(404).send({
            message: 'Product delete error',
            error: error.message
        });
    }
}


export async function updateProduct(req, res) {
    try {
        const currentProductId = req.params?.productId

        if (!currentProductId) {
            return res.status(404).send({ message: "Product not found" });
        }

        const [fields, files] = await form.parse(req);
        const currentProduct = await writePostSql("SELECT * FROM product WHERE id = $1",currentProductId)
        let productImage = currentProduct[0].image_url;
        if(files.image_url){
            unlink(path.join(process.cwd(),"uploads",productImage),(err)=>{console.log(err)})
            productImage = files.image_url[0].newFilename;
        }


   
        await writePostSql(
            'UPDATE product SET name=$1 ,price=$2, quantity=$3, category_id=$4, image_url=$5 WHERE id=$6',
            fields.name ? fields.name[0] : currentProduct[0].name,
            fields.price ? fields.price[0] : currentProduct[0].price,
            fields.quantity ? fields.quantity[0] : currentProduct[0].quantity,
            fields.category_id ? fields.category_id[0] : currentProduct[0].category_id,
            productImage ? productImage : "image_not_set",
            currentProductId
        );

        res.status(200).send({ message: "product updated successfully" });
    } catch (error) {
        res.status(500).send({
            message: 'product updating error',
            data: error.message
        });
    }
}
