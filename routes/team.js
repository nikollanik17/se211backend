const express = require('express');

const teamController = require('../controllers/team');

const router = express.Router();

router.get('/', teamController.getTeams);
router.post('/find', teamController.findTeams);
router.post('/', teamController.postTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
