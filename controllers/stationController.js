const Station = require("../models/Station");

exports.getStations = async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error){
        console.log(error);
        res.json("Erro ao buscar!");
    }
}


// exports.getClient = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const client = await Client.findById({_id: id});
//         res.json(client);
//     } catch (error){
//         console.log(error);
//         res.json("Erro ao buscar!");
//     }
// }

exports.saveStation = async (req, res) => {
    const station = req.body;
    const newStation = new Station({
        name: station.name,
        cnpj: station.cnpj,
    });

    try {
        const result = await newStation.save();
        console.log(result);
        res.json("Salvo com sucesso!")
    } catch (error){
        console.log(error);
        res.json("Erro ao salvar!");
    }
}

// exports.updateClient = async (req, res) => {
//     const {id} = req.params;
//     const client = req.body;
//     try {
//         await Client.findOneAndUpdate({_id: id}, client);
//         res.json("Editado com sucesso!");
//     } catch (error){
//         console.log(error);
//         res.json("Erro ao editar!");
//     }
// }

// exports.deleteClient = async (req, res) => {
//     const {id} = req.params;
//     try {
//         await Client.findOneAndDelete({_id: id});
//         res.json("Removido com sucesso!");
//     } catch (error){
//         console.log(error);
//         res.json("Erro ao remover!");
//     }
// }