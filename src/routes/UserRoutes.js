const { Router } = require('express');
const { getAllUsers, createNewUser, deleteUser, signIn } = require('../controllers/UserControlles');

const router = Router();

router.get('/', getAllUsers)

router.post('/signup',createNewUser)

router.delete('/:id', deleteUser)

router.post('/signin', signIn)

module.exports = router;