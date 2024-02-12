const router = require("express").Router();
const controller = require("./todo.controller");

router.route("/").get(/* code goes here */).post(/* code goes here */);

router
  .route("/:todo_id")
  .get(/* code goes here */)
  .patch(controller.update)
  .delete(controller.destroy);

module.exports = router;
