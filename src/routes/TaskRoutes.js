const { Router } = require('express');
const { createNewTask, getTasksByOwner, getAllTasks, deleteTask, updateState } = require('../controllers/TaskController');
const validateJwt = require('../helpers/ValidateJwt');


const router = Router();

router.get('/all', getAllTasks )

router.get('/owner/:id', validateJwt, getTasksByOwner )

router.post('/new',validateJwt, createNewTask )

router.delete('/delete/:id', validateJwt, deleteTask)

router.put('/update/:id',validateJwt, updateState )

module.exports = router;