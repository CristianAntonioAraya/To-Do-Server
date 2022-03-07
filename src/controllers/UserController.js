const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/Jwt');

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
    const { userName, email, password } = req.body;
    
    const addUser = { userName, email, password } 


    const checkUser = await userModel.findOne({ email: email })

    //Email already use
    if(checkUser) {
        return res.json({
            ok: false,
            msg: 'Email already registered'
        })
    }

    try {
    //Create a new user using the model already created 
        const user = new userModel( addUser )

    //Encrypt the user password before save in data base

        //Salt is the amount of rounfd of hashing
        const salt = bcrypt.genSaltSync();
        //replace for the encrypted password
        user.password = bcrypt.hashSync(password, salt)
        
    //Save in dbs the new user
    await user.save()

    //Generate new Jwt

    const token = await generateJwt( user.id, user.userName )


    res.json({
        ok: true,
        msg: 'User',
        userName: user.userName,
        password: user.password,
        id: user.id,
        token
    })

    } catch (error) {
        console.log(error);
        res.json({
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
            msg: 'User delete Correctly',
            id
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
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email })       
        //If the user doesnt exist
        if(!user){
            return res.json({
                ok: false,
                msg: 'User not found'
            })
        }
        //Check the password
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if(!isValidPassword) { 
            return res.json({ 
                ok:false,
                msg: "Email or password don`t match"
            })
        }

        const token = await generateJwt(user._id, user.userName)

        res.json({
            ok: true,
            msg: 'User login correctly',
            id: user._id,
            userName: user.userName,
            email: user.email,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        })
    }
}

const renewToken = async( req, res ) => { 

    const { id, userName } = req;
    
    const token = await generateJwt(id, userName)

    res.json({
        ok: true,
        msg: "Token renew",
        token,
        id,
        userName
    })

}

module.exports = { getAllUsers, createNewUser, deleteUser, signIn, renewToken }