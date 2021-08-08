const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');

router.get('/:userId', user.findOne);
router.get('/', user.findAll);

router.post('/create', user.create);

router.put('/update/:userId', user.update);

router.delete('/delete/:userId', user.deleteOne);
router.delete('/deleteAll', user.deleteAll);

module.exports = router;