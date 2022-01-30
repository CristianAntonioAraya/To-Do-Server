const taskModel = require('../models/TaskModel');

const getAllTasks = async ( req, res ) => { 
    const task = await taskModel.find();
    res.json({
        ok: true,
        task
    })
}

const getTasksByOwner = async( req, res ) => { 
    const { id } = req.params
    try {

        const ownerTasks = await taskModel.find( { owner: id } )

        res.json({
            ok: true,
            ownerTasks
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Bad Request'
        })
    }
}

const createNewTask = async( req, res ) => {

    const { title, description, state } = req.body;
    console.log(req.body);

    const newTask = new taskModel( { title, description, state } );

    try {
        newTask.owner = req.id;

        await newTask.save()
        res.json({
            ok: true,
            msg: 'Task Create correctly',
            newTask
        })
    } catch (error) {
        console.log(error);
        res.json({ 
            ok:false,
            msg: 'Bad Request'
        })
    }

} 



module.exports = { getAllTasks, getTasksByOwner,createNewTask }