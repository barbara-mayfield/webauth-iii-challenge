const jwt = require("jsonwebtoken")

module.exports = () => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(token, process.env.JWT_TOKEN)

      req.userId = decoded.subject
      next()
    } catch (err) {
      return res.status(401).json({
        message: "Invalid credentials",
      })
    }
  }
}