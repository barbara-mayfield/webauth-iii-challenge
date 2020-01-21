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
          const token = signToken(user);
    
          res.status(200).json({
            token,
            message: `${user.username} successfully logged in!`,
          })
        } else {
          res.status(401).json(invalidUser)
        }
      } catch (err) {
        next(err)
      }
})

function signToken(user) {
    const payload = {
        username: user.username,
    }

    const secret = process.env.JWT_SECRET || "Super secret secret"
    
    const options = {
        expiresIn: '1h'
    }
    
    jwt.sign(payload, secret, options)
}

module.exports = router;