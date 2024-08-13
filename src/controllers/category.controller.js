import { writePostSql } from "../postgres/postgres.js";
import formidable from "formidable";

import path from "path";
import { unlink } from "fs";

const form = formidable({
    keepExtensions: true,
    uploadDir: "uploads"
});

export async function addCategory(req, res) {
    try {
            const [fields,files] = await form.parse(req)

            const categoryName = await writePostSql(
                "INSERT INTO category(name, image_url) VALUES ($1, $2) RETURNING *",
                fields.name[0],
                files.image_url[0].newFilename,
            );

            res.status(201).send({
                message: 'Category created',
                data: categoryName   
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'Category adding error',
            error: error.message
        });
    }
}

export async function getAllCategory(req, res) {
    try {
         

            const categoryNAme = await writePostSql("SELECT * FROM category");

            res.status(200).send({
                message: 'ok',
                data: categoryNAme    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'Category get error',
            error: error.message
        });
    }
}

export async function getOneCategory(req, res) {
    try {
            const currentCategoryId = req.params?.categoryId
     
            const categoryName = await writePostSql("SELECT * FROM category WHERE id = $1",currentCategoryId);

            res.status(200).send({
                message: 'ok',
                data: categoryName    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'Category get error',
            error: error.message
        });
    }
}


export async function deleteCategory(req, res) {
    try {

         
            const currentCategoryId = req.params?.categoryId
            const currentCategory = await writePostSql("SELECT * FROM category WHERE id = $1",currentCategoryId)
            const categoryImage = currentCategory[0].image_url;
   
            unlink(path.join(process.cwd(),"uploads",categoryImage),(err)=>{console.log(err)})
            await writePostSql("DELETE FROM category WHERE id = $1",currentCategoryId);

            res.status(200).send({
                message: 'Category succes deleted',
         
        });
    } catch (error) {
        res.status(404).send({
            message: 'Category delete error',
            error: error.message
        });
    }
}


export async function updateCategory(req, res) {
    try {
        const currentCategoryId = req.params?.categoryId

        if (!currentCategoryId) {
            return res.status(404).send({ message: "Category not found" });
        }

        const [fields, files] = await form.parse(req);
        const currentCategory = await writePostSql("SELECT * FROM category WHERE id = $1",currentCategoryId)
        let categoryImage = currentCategory[0].image_url;
        if(files.image_url){
            unlink(path.join(process.cwd(),"uploads",categoryImage),(err)=>{console.log(err)})
            categoryImage = files.image_url[0].newFilename;
        }


   
        await writePostSql(
            'UPDATE category SET name = $1, image_url = $2 WHERE id = $3',
            fields.name ? fields.name[0] : currentCategory[0].name,
            categoryImage ? categoryImage : "image_not_set",
            currentCategoryId
        );

        res.status(200).send({ message: "category updated successfully" });
    } catch (error) {
        res.status(500).send({
            message: 'category updating error',
            data: error.message
        });
    }
}
