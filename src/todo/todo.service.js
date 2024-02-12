const knex = require("../db/connection");
const table = "todo";

function list() {
  return knex(table).select();
}

function read(id) {
  return knex(table).select().where({ id }).first();
}

function create(newTodo) {
  return knex(table)
    .insert(newTodo)
    .returning("*")
    .then((rows) => {
      return rows[0];
    });
}

function update(todo_id, newTodo) {
  return knex(table).where({ id: todo_id }).update(newTodo).returning("*");
}

function destroy(todo_id) {
  return knex(table).where({ id: todo_id }).delete();
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy
};
