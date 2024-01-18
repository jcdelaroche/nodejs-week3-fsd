const express = require('express');
const {validateShop} = require('../middlewares/validateShop');
const {validatePromotion} = require('../middlewares/validatePromotion');
const {createShop, getShops, getShop} = require('./shops.controller');
const {addPromotion, getPromotion, getByCategory} = require('./promotions.controller');


const router = express.Router();

router.route("/").get(getShops)
router.route("/:id").get(getShop)
router.route('/').post(validateShop, createShop) 
router.route('/promotions/:id').post(validatePromotion, addPromotion)
router.route('/promotions').get(getPromotion)
router.route('/promotions/:category').get(getByCategory)

module.exports = router;