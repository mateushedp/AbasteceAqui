const router = require('express').Router();
const clientController = require('../controllers/clientController');
const stationController = require('../controllers/stationController');

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
  

module.exports = router;