const express = require('express');

const registrationController = require('../controllers/registration');

const router = express.Router();

router.get('/', registrationController.getTime);
router.put('/', registrationController.changeTime);

module.exports = router;
