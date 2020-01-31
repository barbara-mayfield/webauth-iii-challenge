
exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.string("username").notNullable().unique()
        table.string("password").notNullable()
        table.string("department").notNullable()
    })
  
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
};
