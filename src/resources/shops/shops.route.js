const express = require("express");
const { validateShop } = require("../middlewares/validateShop");
const { validatePromotion } = require("../middlewares/validatePromotion");
const { createShop, getShops, getShop } = require("./shops.controller");
const {
  addPromotion,
  getPromotionsByName,
  getPromotionsByCategory,
  getPromotionsByShop,
} = require("./promotions.controller");
const { authentification } = require("../middlewares/authentification");
const { get } = require("mongoose");

const router = express.Router();
router.use(authentification);
router.route("").get(getShops);
router.route("/:id").get(getShop);
router.route("").post(validateShop, createShop);
router.route("/promotions/:id").post(validatePromotion, addPromotion).get(getPromotionsByShop);
router.route("/promotions").get(getPromotionsByName);
router.route("/promotions/search/:category").get(getPromotionsByCategory);

module.exports = router;
