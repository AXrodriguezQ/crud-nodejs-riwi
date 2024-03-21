// todo Traemos el modelo del usuario
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

// ? Creamos objecto que dentro va a tener cada endpoint
const controlUsers = {}

// ? Endpoint para ver todos los usuarios
controlUsers.getAllUsers = async ( req, res ) => {
    // ? Try catch para controlar errores
    try {
        // ? Traemos el modelo del usuario para ver todos los usuarios
        const users = await User.find()
        // ? Enviamos el codigo de estado de la peticion y su respuesta
        res.status(200).send( users )
    } catch (error) {
        res.status(400).send( {error: error.message} );
    }
}

// ? Endpoint para ver un usuario
controlUsers.getUser = async ( req, res ) => {
    try {
        // ? Traemos el modelo del usuario y lo filtramos por el id, que recivimos en el request
        const user = await User.findById( req.params.id )
        res.status(200).send( user )
    } catch (error) {
        res.status(400).send( {error: error.message} );
    }
}

// ? Endpoint para crear un usuario
controlUsers.createUser = async ( req, res ) => {
    try {
        // ? Creamos un nuevo usuario que recivimos en el body del request
        const user = new User( req.body )
        user.userId = new Date().getTime();
        user.password = await bcrypt.hash( user.password, 10 )
        user.likes = 0
        // ? Guardamos el usuario
        await user.save()
        res.status(200).send( {message: "Usuario creado correctamente"} )
    } catch (error) {
        res.status(400).send( {error: error.message} );
    }
}

// ? Endpoint para actualizar un usuario
controlUsers.updateUser = async ( req, res ) => {
    try {
        //? Traemos el modelo del usuario y lo filtramos por el id, que recivimos en el request
        const user = await User.findOneAndUpdate({userId: req.params.id}, req.body, {new: true} )
        res.status(200).send( {message: "Usuario actualizado correctamente"} )
    } catch (error) {
        res.status(400).send( {error: error.message} );
    }
}

// ? Endpoint para eliminar un usuario
controlUsers.deleteUser = async ( req, res ) => {
    try {
        // ? Traemos el modelo del usuario y lo filtramos por el id, que recivimos en el request
        const user = await User.findByIdAndDelete( req.params.id )
        res.status(200).send( {message: "Usuario eliminado correctamente"} )
    } catch (error) {
        res.status(400).send( {error: error.message} );
    }
}

controlUsers.login = async ( req, res ) => {
    try {
        // ? Traemos el modelo del usuario y lo filtramos por el email, que recivimos en el request
        const user = await User.findOne( {email: req.body.email} )
        // ? Verificamos que el usuario existe
        if (!user) {
            res.status(400).send( {error: "Usuario no encontrado"} )
        } else {
            // ? Verificamos que la contraseña es correcta
            const isMatch = await bcrypt.compare( req.body.password, user.password )
            if (!isMatch) {
                res.status(400).send( {error: "Contraseña incorrecta"} )
            } else {
                res.status(200).send( user )
            }
        }
    } catch (error) {
        res.status(400).send( {error: error.message} );
    }
}

// ? Exportamos el objeto que contiene los endpoints
module.exports = controlUsers