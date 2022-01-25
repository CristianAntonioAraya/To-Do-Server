const userModel = require('../models/UserModel');

const getAllUsers = async ( req, res ) => {
    try {
        const users = await userModel.find();
    
        res.json({
            ok: true,
            users
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            msg: 'Internal server error' })
    }
}

const createNewUser = async ( req, res ) => { 

    //Get the new user data provided by the client
    const newUser = req.body;

    try {
    //Create a new user using the model already created 
        const user = new userModel( newUser )
    //Save in dbs the new user
    await user.save()
    res.json({
        ok: true,
        msg: 'User',
        userName: user.userName,
        id: user.id
    })

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: "Bad Request"
        })
    }
}

const deleteUser = async ( req, res ) => {

    //Get the user id by the params of the request
    const {id} = req.params
    try {
        //Find the user with the id and delete
        await userModel.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg: 'User delete Correctly'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        })
    }
}
const signIn = async ( req, res ) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email })
        console.log(user);
        if(!user){
            res.json({
                ok: false,
                msg: 'Invalid Credentials'
            })
        }
        else{
            res.json({
                ok: true,
                userName: user.userName,
                email: user.email,
                id: user._id
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        })
    }

}


module.exports = { getAllUsers, createNewUser, deleteUser, signIn }