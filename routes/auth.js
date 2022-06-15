const express = require('express');
const router = express.Router();

const {signin, signup} = require('../controllers/auth');

router.post('/auth/login', signin);
router.post('/auth/signup', signup);

module.exports = router;