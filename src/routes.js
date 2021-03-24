const { Router } = require('express');
const UserController = require('./controller/userController');
const userController = new UserController();
const router = Router();

router.get('/', (req, res) => {res.send('Hello World')});
router.get('/users', userController.GetUsers);

module.exports = router;