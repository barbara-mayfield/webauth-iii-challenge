const bcrypt = require("bcryptjs")
const express = require("express")
const jwt = require("jsonwebtoken")

const usersModel = require("../users/user-model")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
        const registered = await usersModel.registerUser(req.body)
        
        res.status(201).json(registered)
      } catch (err) {
        next(err)
      }
})

router.post("/login", async (req, res, next) => {
    try {
        const invalidUser = { 
            message: "Invalid Username or Password"
        }

        const { username, password } = req.body
        const user = await usersModel.findBy({ username }).first()
        const passwordValid = await bcrypt.compare(password, user.password)
        
        if (user && passwordValid) {
            // sign token
          const token = jwt.sign({
              subject: user.id,
              username: user.username,
            }, process.env.JWT_SECRET, {
                expiresIn: "12d",
          })
    
            // send token
          res.status(200).json({
            token: token,
            message: `${user.username} successfully logged in!`,
          })
        } else {
          res.status(401).json(invalidUser)
        }
      } catch (err) {
        next(err)
      }
})

module.exports = router;