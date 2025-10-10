const express = require('express');
const router = express.Router();
const groundController = require('../controllers/groundController');
const auth = require('../middlewares/auth');

router.post('/create', auth, groundController.createGround);
router.get('/all', groundController.getAllGrounds);
router.get('/:id', groundController.getGroundById); 
router.delete('/:id', auth, groundController.deleteGround);

module.exports = router;
