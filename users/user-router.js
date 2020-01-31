const express = require("express")
const restricted = require("../middleware/restricted")
const usersModel = require("./user-model")

const router = express.Router()

router.get("/", restricted(), async (req, res, next) => {
    try{
        const users = await usersModel.find()

        res.json(users)
    } catch {
        next(err)
    }
})

module.exports = router;