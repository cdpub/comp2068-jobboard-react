// router module
const router = require('express').Router();

// controller
const SessionsController = require('../controllers/sessionsController');

// routes
//router.get(`/login`, SessionsController.login); 
router.post(`/authenticate`, SessionsController.authenticate);
router.post(`/logout`, SessionsController.logout);

// to export our changes
module.exports = router;