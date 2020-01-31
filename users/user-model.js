const bcrypt = require("bcryptjs")
const db = require("../data/dbConfig")

function find() {
    return db("users")
        .select("id", "username", "department")
} 

function findBy(data) {
    return db("users")
      .where(data)
      .select("id", "username", "password", "department")
}

function findById(id) {
    return db("users")
        .where({ id })
        .first("id", "username", "department")
}

async function registerUser(user) {
    user.password = await bcrypt.hash(user.password, 16)
    const [id] = await db("users")
        .insert(user)

    return findById(id)
}


module.exports = {
    find,
    findBy,
    findById,
    registerUser
}