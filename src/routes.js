const { Router } = require("express");
const UserController = require("./controller/userController");
const userController = new UserController();
const router = Router();

router.get("/", (req, res) => {res.send("Hello World")});
router.get("/users", userController.GetUsers);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;