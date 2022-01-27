const { Router } = require('express');
const { getAllUsers, createNewUser, deleteUser, signIn, renewToken } = require('../controllers/UserController');
const validateJwt = require('../helpers/ValidateJwt');

const router = Router();

router.get('/', getAllUsers)

router.post('/signup',createNewUser)

router.delete('/:id', deleteUser)

router.post('/signin', signIn)

router.get('/renew', validateJwt, renewToken )

module.exports = router;