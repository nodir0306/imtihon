import {writePostSql} from "../postgres/postgres.js"



export async function createOrder(req,res) {
        const {customer_id,status} = req.body;
        await writePostSql("INSERT INTO orders(customer_id,status) VALUES($1,$2)",customer_id,status);
        res.status(201).send({message: "created succes"})
}

export async function getAllOrders(req,res) {
    const currentOrderId = req.params.orderId;
    const response = await writePostSql(`SELECT * FROM orders`)
    res.status(200).send({message: response})
}
export async function getAllOrdersWithCustomerId(req,res) {
    const currentCustomerId = req.params.customerId;
    const response = await writePostSql(`SELECT * FROM orders WHERE  customer_id= $1`,currentCustomerId)
    res.status(200).send({message: response})
}

export async function getOneOrder(req,res) {
    const currentOrderId = req.params.orderId;
    const response = await writePostSql(`SELECT * FROM orders WHERE  id= $1`,currentOrderId)
    res.status(200).send({message: response})
}

export async function deleteOrder(req,res) {
    const currentOrderId = req.params.orderId;
    await writePostSql(`DELETE FROM orders WHERE  id= $1`,currentOrderId)
    res.status(200).send({message: "order deleted succes"})
}
export async function updateOrder(req, res) {
        const { customer_id, status } = req.body;
        const currentOrderId = req.params.orderId;

        const currentOrder = await writePostSql("SELECT * FROM orders WHERE id = $1", currentOrderId);
        if (!currentOrder || currentOrder.length === 0) {
            return res.status(404).send({ message: "Order not found" });
        }


        const updatedCustomerId = customer_id || currentOrder[0].customer_id;
        const updatedStatus = status || currentOrder[0].status;

  
        await writePostSql(
            `UPDATE orders SET customer_id = $1, status = $2 WHERE id = $3`,
            updatedCustomerId, updatedStatus, currentOrderId
        );

        console.log(`Order ${currentOrderId} updated with status: ${updatedStatus}`);

        res.status(200).send({ message: "Order updated successfully" });
   
}

