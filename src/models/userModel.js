// todo desectrusturamos unicamente lo necesario que vamos a utilizar de mongoose
const { Schema, model } = require('mongoose')

// ? Creamos el esquema de usuario que es igual al de la db
const User = new Schema({
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    }
})

// ? exportamos el modelo
module.exports = model('users', User)