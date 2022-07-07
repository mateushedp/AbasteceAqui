const Sale = require('../models/Sale');
const Client = require('../models/Client');
const Station = require('../models/Station');

//Essa função recebe um valor a ser subtraído e o id do cliente a ser removido
//Caso o cliente não possua saldo suficiente, irá retornar false;
const subtractFromClientCredit = async (value, clientId) => {
  const client = await Client.findById({ _id: clientId });
  if (client.credit - value > 0) {
    client.credit -= value;
    await client.save();
    return true;
  } else {
    return false;
  }
};

const setDiscount = (discount, value) => {
  let returnValue = value - value * (discount / 100);
  return returnValue;
};

exports.saveSale = async (req, res) => {
  let { clientId, stationId, value, attendantId, rating } = req.body;

  const station = await Station.findById({ _id: stationId });

  if (station.discount) {
    value = setDiscount(station.discount, value);
  }

  const sale = new Sale({
    client: clientId,
    station: stationId,
    value: value,
    attendant: attendantId,
    rating: rating,
  });

  const isSubtracted = await subtractFromClientCredit(value, clientId);

  if (isSubtracted) {
    try {
      const result = await sale.save();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json('Erro ao salvar!');
    }
  } else {
    res.json('Credito insuficiente para finalizar a compra!');
  }
};

exports.getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findById({ _id: id }).populate(
      'client station attendant'
    );
    res.json(sale);
  } catch (error) {
    console.log(error);
    res.json('Erro ao buscar!');
  }
};

exports.getAllSalesFromClient = async (req, res) => {
  const { clientId } = req.params;
  try {
    const sales = await Sale.find({ client: clientId }).populate(
      'client station'
    );
    res.json(sales);
  } catch (error) {
    console.log(error);
    res.json('Erro ao buscar!');
  }
};

module.exports.subtractFromClientCredit = subtractFromClientCredit;
module.exports.setDiscount = setDiscount;
