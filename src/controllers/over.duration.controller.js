import { writePostSql } from "../postgres/postgres.js";

export async function createContract(req, res) {
    try {
        const { customer_id, product_id, quantity, contract_type_id } = req.body;

    
        if (!customer_id || !product_id || !quantity || !contract_type_id) {
            return res.status(400).send({ message: 'All fields are required' });
        }


        const productResult = await writePostSql('SELECT * FROM product WHERE id = $1', [product_id]);
        const product = productResult[0];
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const totalPrice = product.price * quantity;
        const initialPayment = totalPrice * 0.25;
        const remainingAmount = totalPrice - initialPayment;


        const contractTypeResult = await writePostSql('SELECT * FROM contract_type WHERE id = $1', [contract_type_id]);
        const contractType = contractTypeResult[0];
        if (!contractType) {
            return res.status(404).send({ message: 'Contract type not found' });
        }

        const monthlyInterestRate = contractType.percentage / 100;
        const numberOfMonths = contractType.duration;
        const monthlyPayment = Math.ceil((remainingAmount * (1 + monthlyInterestRate)) / numberOfMonths);

  
        const orderResult = await writePostSql('INSERT INTO orders (customer_id, order_date, status) VALUES ($1, NOW(), $2) RETURNING id', [customer_id, 'pending']);
        const orderId = orderResult[0].id;

  
        await writePostSql('INSERT INTO contracts (order_id, customer_id, contract_type_id, monthly_payment, contract_status, starting_payment_percent, total_payment) VALUES ($1, $2, $3, $4, $5, $6, $7)', [
            orderId, customer_id, contract_type_id, monthlyPayment, 'notFinished', 25, totalPrice
        ]);

        res.status(201).send({ message: 'Contract created successfully', data: { orderId, monthlyPayment, totalPayment: totalPrice } });
    } catch (error) {
        res.status(500).send({ message: 'Error creating contract', error: error.message });
    }
}
