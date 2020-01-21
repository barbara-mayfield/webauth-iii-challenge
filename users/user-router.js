const express = require("express")
const usersModel = require("./user-model")

const router = express.Router()

router.get("/", async(req, res, next) => {
    try{
        const users = await usersModel.find()

        res.json(users)
    } catch {
        next(err)
    }
})

module.exports = router;