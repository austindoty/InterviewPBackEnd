// middleware/validate.js

function validateId(req, res, next) {
    const todoId = req.params.todo_id;
    if (!Number.isInteger(parseInt(todoId))) {
      return res.status(404).json({
        error: { message: `Invalid todo ID: ${todoId}` },
      });
    }
    next();
  }
  
  module.exports = {
    validateId,
  };
  