
exports.up = function(knex) {
  return knex.schema.createTable ('pizza', function (table){
    table.string('id').primary();
    table.string('size').notNullable();
    table.string('border').notNullable();
    table.string('coverage').notNullable();
    table.string('value').notNullable();
    
});  
};

exports.down = function(knex) {
return knex.schema.dropTable('pizza');

};