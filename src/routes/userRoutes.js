const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/users", registerUser);
router.post("/users/login", loginUser);

module.exports = router;
