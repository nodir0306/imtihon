import { writePostSql } from "../postgres/postgres.js";
import formidable from "formidable";
import { unlink } from 'fs/promises';

const form = formidable({
    keepExtensions: true,
    uploadDir: "uploads"
});

export async function addUser(req, res) {
    try {
            const [fields,files] = await form.parse(req)

            const newUser = await writePostSql(
                "INSERT INTO customer(name, email, password, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                fields.name[0],
                fields.email[0],
                fields.password[0],
                fields.phone[0],
                fields.address[0]
            );

            res.status(201).send({
                message: 'User created',
                data: newUser    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'User adding error',
            error: error.message
        });
    }
}

export async function getAllCustomers(req, res) {
    try {
         

            const newUser = await writePostSql("SELECT * FROM customer");

            res.status(200).send({
                message: 'ok',
                data: newUser    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'Users get error',
            error: error.message
        });
    }
}

export async function getOneCustomer(req, res) {
    try {
         
            const currentCustomerId = req.params?.customerId
            const newUser = await writePostSql("SELECT * FROM customer WHERE id = $1",currentCustomerId);

            res.status(200).send({
                message: 'ok',
                data: newUser    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'User get error',
            error: error.message
        });
    }
}


export async function deleteCustomer(req, res) {
    try {
         
            const currentCustomerId = req.params?.customerId
            const newUser = await writePostSql("DELETE FROM customer WHERE id = $1",currentCustomerId);

            res.status(200).send({
                message: 'Acustomer succes deleted',
                data: newUser    
         
        });
    } catch (error) {
        res.status(500).send({
            message: 'User delete error',
            error: error.message
        });
    }
}


export async function updateCustomer(req, res) {
    try {
        const userId = req.params?.customerId;

        if (!userId) {
            return res.status(404).send({ message: "User not found" });
        }

        const [fields, files] = await form.parse(req);

        const result = await writePostSql("SELECT * FROM customer WHERE id = $1", userId);

   
        await writePostSql(
            'UPDATE customer SET name = $1, email = $2, password = $3, phone = $4, address = $5 WHERE id = $6',
            fields.name ? fields.name[0] : foundedUser.name,
            fields.email ? fields.email[0] : foundedUser.email,
            fields.password ? fields.password[0] : foundedUser.password,
            fields.phone ? fields.phone[0] : foundedUser.phone,
            fields.address ? fields.address[0] : foundedUser.address,
            userId
        );

        res.status(200).send({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).send({
            message: 'User updating error',
            data: error.message
        });
    }
}
