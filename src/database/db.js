// todo: Agregando las dependencias que necesitamos
const mongoose = require('mongoose')

// ! Variable de conexion creada en el .env
const MONGO = process.env.MONGO_URL

// ? Creamos coxion con variables necesarias para eso
mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    // ? Verificamos que la conexion este correcta
    .then(db => console.log("Conectado con la base de datos"))
    .catch(err => console.error("Error en la conexion: ",err))