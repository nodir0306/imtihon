import {writePostSql} from "../postgres/postgres.js";

export async function createOrderItem(req, res) {
    const {order_id, product_id, quantity, price, isCredit} = req.body;
    await writePostSql("INSERT INTO order_items(order_id, product_id, quantity, price, isCredit) VALUES($1, $2, $3, $4, $5)", order_id, product_id, quantity, price, isCredit);
    res.status(201).send({message: "Order item created successfully"});
}

export async function getAllOrderItems(req, res) {
    const response = await writePostSql("SELECT * FROM order_items");
    res.status(200).send({message: response});
}

export async function getOneOrderItem(req, res) {
    const currentOrderItemId = req.params.orderItemId;
    const response = await writePostSql("SELECT * FROM order_items WHERE id = $1", currentOrderItemId);
    res.status(200).send({message: response});
}

export async function deleteOrderItem(req, res) {
    const currentOrderItemId = req.params.orderItemId;
    const response = await writePostSql("DELETE FROM order_items WHERE id = $1 RETURNING *", currentOrderItemId);
    if (response.length === 0) {
        return res.status(404).send({message: "Order item not found"});
    }
    res.status(200).send({message: "Order item deleted successfully"});
}

export async function updateOrderItem(req, res) {
    const {order_id, product_id, quantity, price, isCredit} = req.body;
    const currentOrderItemId = req.params.orderItemId;

    const currentOrderItem = await writePostSql("SELECT * FROM order_items WHERE id = $1", currentOrderItemId);

    const updatedOrderId = order_id || currentOrderItem[0].order_id;
    const updatedProductId = product_id || currentOrderItem[0].product_id;
    const updatedQuantity = quantity || currentOrderItem[0].quantity;
    const updatedPrice = price || currentOrderItem[0].price;
    const updatedIsCredit = isCredit !== undefined ? isCredit : currentOrderItem[0].isCredit;

    await writePostSql(
        "UPDATE order_items SET order_id = $1, product_id = $2, quantity = $3, price = $4, isCredit = $5 WHERE id = $6",
        updatedOrderId, updatedProductId, updatedQuantity, updatedPrice, updatedIsCredit, currentOrderItemId
    );

    res.status(200).send({message: "Order item updated successfully"});
}
