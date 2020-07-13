exports.up = function(knex) {
    return knex.schema.createTable('subjects', (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('url').notNullable();
      table.string('icon').notNullable();
      table.string('color').notNullable();
      table.string('image').notNullable();
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('subjects');
  };
  