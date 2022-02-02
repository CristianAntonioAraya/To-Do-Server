const jwt = require('jsonwebtoken')

const generateJwt = ( id, userName ) => {
    return new Promise (( resolve , reject ) => { 
        //Payload contains the user credentials
        const payload = { id, userName }

        const secret = process.env.SECRET_JWT_SEED;

        //Create a new token and sign using the secret word
        jwt.sign(payload, secret, {     
            expiresIn: '7d'
        }, (error, token ) => { 

            //If error exist, reject the promise
            if(error){ 
                console.log(error);
                reject('Error generating the token')
            }
            resolve(token)
        })  
    })
}

module.exports = { generateJwt }