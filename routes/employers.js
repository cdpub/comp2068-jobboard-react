// router module
const router = require('express').Router();

// controller
const EmployersController = require('../controllers/employersController');
                              
                   
router.post(`/`, EmployersController.create);               


module.exports = router;