
exports.up = (knex) => {
    return knex.schema.createTable('amazon_week_highlight', (table) => {
      table.increments('id');
      table.string('book_google_id').notNullable();
      table.string('book_title').notNullable();
      table.string('book_cover_url').notNullable();
      table.text('book_description').notNullable();
      table.string('book_subjects');
      table.integer('position').notNullable();
      table.string('book_author').notNullable();
      table.date('book_highlighted_at').notNullable();
    })
  };
  
  exports.down = (knex) => {
      return knex.schema.dropTable('amazon_week_highlight');
  };
  