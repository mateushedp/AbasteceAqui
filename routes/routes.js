const router = require('express').Router();
const clientController = require('../controllers/clientController');
const stationController = require('../controllers/stationController');
const saleController = require('../controllers/saleController');
const attendantController = require('../controllers/attendantController');

router

  //Client routes
  .get('/getClients', clientController.getClients)
  .get('/getClient/:id', clientController.getClient)
  .post('/saveClient', clientController.saveClient)
  .put('/updateClient/:id', clientController.updateClient)
  .delete('/deleteClient/:id', clientController.deleteClient)
  .put('/addCredit/:id', clientController.addCredit)

  //Station routes
  .get('/getStations', stationController.getStations)
  .post('/saveStation', stationController.saveStation)

  //Sale routes
  .get('/getSale/:id', saleController.getSale)
  .get('/getAllSalesFromClient/:clientId', saleController.getAllSalesFromClient)
  .post('/saveSale', saleController.saveSale)

  //Attendant routes
  .get('/getAttendant/:id', attendantController.getAttendant)
  .post('/saveAttendant', attendantController.saveAttendant);

module.exports = router;
