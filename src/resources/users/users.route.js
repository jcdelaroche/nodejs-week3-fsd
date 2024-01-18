const express = require("express");
const { validateUser } = require("../middlewares/validateUser");
const {
  signUp,
  getAllUsers,
  logIn,
  addFav,
  deleteUser,
  deleteFav,
} = require("./users.controller");
const { authentification } = require("../middlewares/authentification");

const router = express.Router();

// middleware validate user
router.route("").get(authentification, getAllUsers);
router.route("/signup").post(validateUser, signUp);
router.route("/login").post(logIn);
router.route("/addfav").post(authentification, addFav);
router.route("/delete").delete(authentification, deleteUser);
router.route("/deletefav").delete(authentification, deleteFav);
module.exports = router;
