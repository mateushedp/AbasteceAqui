const Sale = require("../models/Sale");
const Client = require("../models/Client");


//Essa função recebe um valor a ser subtraído e o id do cliente a ser removido
//Caso o cliente não possua saldo suficiente, irá retornar false;
const subtractFromClientCredit = async (value, clientId) => {
    const client = await Client.findById({_id: clientId});
    if(client.credit - value > 0){
        client.credit -= value;
        await client.save();
        return true;
    } else {
        return false;
    }
}


exports.saveSale = async (req, res) => {
    const {clientId, stationId, value} = req.body;

    const sale = new Sale({
        client: clientId,
        station: stationId,
        value: value
    });

    const isSubtracted = await subtractFromClientCredit(value, clientId);

    if(isSubtracted){
        try {
            const result = await sale.save();
            res.json(result);
        } catch (error){
            console.log(error);
            res.json("Erro ao salvar!");
        }
    } else {
        res.json("Credito insuficiente para finalizar a compra!");
    }
}

exports.getSale = async(req, res) => {
    const {id} = req.params;
    try {
        const sale = await Sale
        .findById({_id: id})
        .populate('client station');
        res.json(sale);
    } catch (error){
        console.log(error);
        res.json("Erro ao buscar!");
    }
}

exports.getAllSalesFromClient = async (req, res) => {
    const {clientId} = req.params;
    try {
        const sales = await Sale
        .find({client: clientId})
        .populate('client station');
        res.json(sales);
    } catch (error){
        console.log(error);
        res.json("Erro ao buscar!");
    }
}
