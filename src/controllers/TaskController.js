const res = require('express/lib/response');
const TaskModel = require('../models/TaskModel');
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
const deleteTask = async ( req, res ) => { 
    
    const { id } = req.params;
    const task =await TaskModel.findById( id )

    if( !task ){
        return res.json({ 
            ok: false,
            msg: 'task not found'
        })
    }
    
    try {
        await taskModel.findByIdAndDelete( id )
        res.json({
            ok: true,
            msg : 'Task remove correctly'
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Internal Server error'
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
const updateState = async( req, res ) => {


    const { state } = req.body;
    const { id } = req.params

    const task = await taskModel.findById( id )

    if(!task){
        return res.json({
            ok:false,
            msg: 'Task not found'
        })
    }

    try {
        await taskModel.findByIdAndUpdate( id, {'state': state})
        res.json({
            ok: true,
            msg: 'Task updated correctly',
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok:false,
            msg: 'Internal Server error'
        })
    }
}



module.exports = { getAllTasks, getTasksByOwner,createNewTask, deleteTask,updateState }