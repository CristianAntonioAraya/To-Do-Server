const jwt = require('jsonwebtoken')

const validateJwt = ( req, res, next ) => {
    //Extract the token provided by the request
    const token = req.header('x-token')
    //If the client dont send a token
    if(!token){
        return res.json({
            ok: false,
            msg: 'The token is missing'
        })
    }

    try {
        //Verify the token is valid and extract the id and userName
        const { id, userName } = jwt.verify( token, process.env.SECRET_JWT_SEED )

        //Create a id and userName in the request to make accesible
        req.id = id;
        req.userName = userName;
        

    } catch (error) {
        console.log('Jwt expired or invalid');
        return res.json({ 
            ok: false,
            msg: 'Invalid Token'
        })
    }
    //If all is ok and the token is valid, then continues with the request
    next()
}




module.exports = validateJwt;