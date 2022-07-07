const Attendant = require('../models/Attendant');

exports.getAttendant = async (req, res) => {
  const { id } = req.params;
  try {
    const attendant = await Attendant.findById({ _id: id });
    res.json(attendant);
  } catch (error) {
    console.log(error);
    res.json('Erro ao buscar!');
  }
};

exports.saveAttendant = async (req, res) => {
  const attendant = req.body;
  const newAttendant = new Attendant({
    name: attendant.name,
    station: attendant.stationId,
  });

  try {
    const result = await newAttendant.save();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json('Erro ao salvar!');
  }
};
