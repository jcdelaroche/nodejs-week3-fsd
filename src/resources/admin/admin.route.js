const express = require('express');
const {explosion} = require('./admin.controller');

const router = express.Router();
router.route('/admin').delete(explosion);

module.exports = router;