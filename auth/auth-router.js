const bcrypt = require("bcryptjs")
const express = require("express")
const restricted = require("../middleware/restricted")
const usersModel = require("../users/users-model")

const router = express.Router()

router.post("/register", async (req, res, next) => {
})

router.post("/login", async (req, res, next) => {
})

module.exports = router;