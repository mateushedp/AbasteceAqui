const Client = require("../models/Client");


exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error){
        console.log(error);
        res.json("Erro ao buscar!");
    }
}

exports.getClient = async (req, res) => {
    const {id} = req.params;
    try {
        const client = await Client.findById({_id: id});
        res.json(client);
    } catch (error){
        console.log(error);
        res.json("Erro ao buscar!");
    }
}

exports.saveClient = async (req, res) => {
    const client = req.body;
    const newClient = new Client({
        name: client.name,
        phone: client.phone,
        email: client.email,
        credit: 0,
    });

    try {
        const result = await newClient.save();
        console.log(result);
        res.json("Salvo com sucesso!")
    } catch (error){
        console.log(error);
        res.json("Erro ao salvar!");
    }
}

exports.updateClient = async (req, res) => {
    const {id} = req.params;
    const client = req.body;
    try {
        await Client.findOneAndUpdate({_id: id}, client);
        res.json("Editado com sucesso!");
    } catch (error){
        console.log(error);
        res.json("Erro ao editar!");
    }
}

exports.deleteClient = async (req, res) => {
    const {id} = req.params;
    try {
        await Client.findOneAndDelete({_id: id});
        res.json("Removido com sucesso!");
    } catch (error){
        console.log(error);
        res.json("Erro ao remover!");
    }
}

exports.addCredit = async (req, res) => {
    const {id} = req.params;
    const {credit} = req.body;
    try {
        const client = await Client.findOne({_id: id});
        client.credit += credit;
        await client.save();
        res.json("Editado com sucesso!");
    } catch (error){
        console.log(error);
        res.json("Erro ao editar!");
    }
}