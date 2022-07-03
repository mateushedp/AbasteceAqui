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