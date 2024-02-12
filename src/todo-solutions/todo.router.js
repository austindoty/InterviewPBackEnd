// Import the Express Router
const router = require("express").Router();

// Import the controller module for handling todo-related requests
const controller = require("./todo.controller");

// Import the validateId middleware for validating todo IDs
const { validateId } = require("../middleware/validate-id");

// Define routes for handling todo-related requests

// Route for handling GET and POST requests to /todos
router
  .route("/")
  .get(controller.list) // Route to get all todos
  .post(controller.create); // Route to create a new todo

// Route for handling GET, PATCH, and DELETE requests to /todos/:todo_id
router
  .route("/:todo_id")
  .get(validateId, controller.read) // Route to get a todo by its ID
  .patch(validateId, controller.update) // Route to update a todo by its ID
  .delete(validateId, controller.destroy); // Route to delete a todo by its ID

// Export the router to be used by the main Express application
module.exports = router;
