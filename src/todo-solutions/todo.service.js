// Import the Knex instance for interacting with the database
const knex = require("../db/connection");

// Define the table name
const table = "todo";

// Function to retrieve all todos from the database
function list() {
  return knex(table).select();
}

// Function to retrieve a single todo by its ID from the database
function read(id) {
  return knex(table).select().where({ id }).first();
}

// Function to create a new todo in the database
function create(newTodo) {
  return knex(table)
    .insert(newTodo) // Insert the new todo into the database
    .returning("*") // Return all columns of the newly inserted row
    .then((rows) => {
      return rows[0]; // Return the first row (the newly created todo)
    });
}

// Function to update a todo in the database
function update(todo_id, newTodo) {
  return knex(table)
    .where({ id: todo_id }) // Find the todo with the specified ID
    .update(newTodo) // Update its values with the newTodo object
    .returning("*"); // Return all columns of the updated row
}

// Function to delete a todo from the database
function destroy(todo_id) {
  return knex(table)
    .where({ id: todo_id }) // Find the todo with the specified ID
    .delete(); // Delete it from the database
}

// Export the service functions to be used by the controller
module.exports = {
  list,
  read,
  create,
  update,
  destroy,
};
