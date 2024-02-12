// Import the service module which contains functions for interacting with the todo data
const service = require("./todo.service");

// Middleware function to validate todo_id parameter
function idIsValid(req, res, next) {
  // Check if todo_id is not a valid number
  if (isNaN(req.params.todo_id, 10)) {
    // If not valid, return a 404 response with an error message
    return res.status(404).json({
      error: { message: `Invalid id` },
    });
  } else {
    // If valid, proceed to the next middleware or route handler
    next();
  }
}

// Controller function to handle updating a todo
async function update(req, res) {
  // Extract todo_id, title, and completed from request parameters and body
  const { todo_id } = req.params;
  const { title, completed } = req.body;
  // Create an object with the updated todo data
  const todoToUpdate = { title, completed };

  // Count the number of non-empty values in todoToUpdate
  const numberOfValues = Object.values(todoToUpdate).filter(Boolean).length;
  // If no valid values provided, return a 400 response with an error message
  if (numberOfValues === 0)
    return res.status(400).json({
      error: {
        message: `Request body must content either 'title' or 'completed'`,
      },
    });

  // Update the todo with the provided todo_id and updated data
  const updated = await service.update(todo_id, todoToUpdate);
  // Return the updated todo as JSON response
  res.status(200).json(updated[0]);
}

// Controller function to handle deleting a todo
async function destroy(req, res) {
  // Extract todo_id from request parameters
  const { todo_id } = req.params;
  // Delete the todo with the provided todo_id
  await service.destroy(todo_id);
  // Return a 204 response indicating successful deletion
  res.status(204).end();
}

// Controller function to handle listing all todos
async function list(req, res) {
  // Retrieve all todos from the service
  const todos = await service.list();
  // Return the list of todos as JSON response
  res.json(todos);
}

// Controller function to handle reading a single todo
async function read(req, res) {
  // Extract todo_id from request parameters
  const { todo_id } = req.params;
  // Retrieve the todo with the provided todo_id from the service
  const todo = await service.read(todo_id);
  // If todo not found, return a 404 response with an error message
  if (!todo) {
    return res.status(404).json({
      error: { message: `Todo with id ${todo_id} not found` },
    });
  }
  // Return the todo as JSON response
  res.json(todo);
}

// Controller function to handle creating a new todo
async function create(req, res) {
  // Extract title and completed from request body
  const { title, completed } = req.body;
  // If title is missing or completed is not a boolean, return a 400 response with an error message
  if (!title || typeof completed !== "boolean") {
    return res.status(400).json({
      error: {
        message: `Request body must include 'title' and 'completed'`,
      },
    });
  }
  // Create a new todo object with title and completed
  const newTodo = { title, completed };
  // Call the service function to create the new todo
  const createdTodo = await service.create(newTodo);
  // Return the created todo as JSON response
  res.status(201).json(createdTodo);
}

// Export controller functions to be used by routes
module.exports = {
  read,
  list: [list, idIsValid], // Middleware idIsValid is applied after list
  create,
  update: [update, idIsValid], // Middleware idIsValid is applied after update
  destroy: [destroy, idIsValid], // Middleware idIsValid is applied after destroy
};
