const { Router } = require('express');
const { createNewTask, getTasksByOwner, getAllTasks } = require('../controllers/TaskController');
const validateJwt = require('../helpers/ValidateJwt');


const router = Router();

router.get('/all', getAllTasks )

router.get('/owner/:id', validateJwt, getTasksByOwner )

router.post('/new',validateJwt, createNewTask )


module.exports = router;