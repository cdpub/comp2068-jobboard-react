// Our router module
const router = require('express').Router();

// Our controller
const JobsController = require('../controllers/jobsController');

// Our routes             
router.get(`/`, JobsController.index);                       
router.get(`/:id`, JobsController.show); 
router.get(`/:id/edit`, JobsController.edit);              
router.post(`/`, JobsController.create);               
router.post(`/update`, JobsController.update);
router.post(`/destroy`, JobsController.destroy);


// export changes
module.exports = router;