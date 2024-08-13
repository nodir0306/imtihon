import {writePostSql} from "../postgres/postgres.js";

export async function createPayment(req, res) {
    const {order_id, payment_date, amount, status, contract_id} = req.body;
    await writePostSql(
        "INSERT INTO payment(order_id, payment_date, amount, status, contract_id) VALUES($1, $2, $3, $4, $5)",
        order_id, payment_date, amount, status, contract_id
    );
    res.status(201).send({message: "Payment created successfully"});
}

export async function getAllPayments(req, res) {
    const response = await writePostSql("SELECT * FROM payment");
    res.status(200).send({message: response});
}

export async function getOnePayment(req, res) {
    const currentPaymentId = req.params.paymentId;
    const response = await writePostSql("SELECT * FROM payment WHERE id = $1", currentPaymentId);

    res.status(200).send({message: response});
}

export async function deletePayment(req, res) {
    const currentPaymentId = req.params.paymentId;
    const response = await writePostSql("DELETE FROM payment WHERE id = $1 RETURNING *", currentPaymentId);

    res.status(200).send({message: "Payment deleted successfully"});
}

export async function updatePayment(req, res) {
    const {order_id, payment_date, amount, status, contract_id} = req.body;
    const currentPaymentId = req.params.paymentId;

    const currentPayment = await writePostSql("SELECT * FROM payment WHERE id = $1", currentPaymentId);


    const updatedOrderId = order_id || currentPayment[0].order_id;
    const updatedPaymentDate = payment_date || currentPayment[0].payment_date;
    const updatedAmount = amount || currentPayment[0].amount;
    const updatedStatus = status || currentPayment[0].status;
    const updatedContractId = contract_id || currentPayment[0].contract_id;

    await writePostSql(
        "UPDATE payment SET order_id = $1, payment_date = $2, amount = $3, status = $4, contract_id = $5 WHERE id = $6",
        updatedOrderId, updatedPaymentDate, updatedAmount, updatedStatus, updatedContractId, currentPaymentId
    );


    res.status(200).send({message: "Payment updated successfully"});
}
