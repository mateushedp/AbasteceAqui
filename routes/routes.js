const router = require('express').Router();
const clientController = require('../controllers/clientController');

router
  .get('/getClients', clientController.getClients)
  .get('/getClient/:id', clientController.getClient)
  .post('/saveClient', clientController.saveClient)
  .put('/updateClient/:id', clientController.updateClient)
  .delete('/deleteClient/:id', clientController.deleteClient)

  

module.exports = router;