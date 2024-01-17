const express = require('express');
const {validateShop} = require('../middlewares/validateShop');
const {createShop, getShops, getShop} = require('./shops.controller');


const router = express.Router();

router.route("/").get(getShops)
router.route("/:id").get(getShop)
router.route('/').post(validateShop, createShop) 


module.exports = router;