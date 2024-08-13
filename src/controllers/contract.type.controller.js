import {writePostSql} from "../postgres/postgres.js"



export async function createContractType(req,res) {
        const {duration,percentage} = req.body;
        await writePostSql("INSERT INTO contract_type(duration,percentage) VALUES($1,$2)",duration,percentage);
        res.status(201).send({message: "created succes"})
}

export async function getAllContractType(req,res) {
    const response = await writePostSql(`SELECT * FROM contract_type`)
    res.status(200).send({message: response})
}


export async function getOneContractType(req,res) {
    const {contractTypeId} = req.params;

    const response = await writePostSql(`SELECT * FROM contract_type WHERE  id= $1`,contractTypeId)
    res.status(200).send({message: response})
}

export async function deleteContractType(req,res) {
    const {contractTypeId} = req.params;
    await writePostSql(`DELETE FROM contract_type WHERE  id= $1`,contractTypeId)
    res.status(200).send({message: "order deleted succes"})
}
export async function updateContractType(req, res) {
        const { duration, percentage } = req.body;

        const {contractTypeId} = req.params;

        const currentOrder = await writePostSql("SELECT * FROM contract_type WHERE id = $1", contractTypeId);
        if (!currentOrder || currentOrder.length === 0) {
            return res.status(404).send({ message: "Contract type not found" });
        }


        const updateDuration = duration || currentOrder[0].duration;
        const updatedPerenage = percentage || currentOrder[0].percentage;

  
        await writePostSql(
            `UPDATE contract_type SET duration = $1, percentage = $2 WHERE id = $3`,
            updateDuration, updatedPerenage, contractTypeId
        );

     

        res.status(200).send({ message: "Order updated successfully" });
   
}

