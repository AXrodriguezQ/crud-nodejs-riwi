// todo: Agregando las dependencias que necesitamos
const express = require('express')
const cors = require('cors')

// ? Le damos todo el valor de express a la variable app
const app = express()

// ? Creamos un port en app para utilizarlo siempre con la palabra port: --> EL VALOR SALE DE .ENV 
app.set('port', process.env.PORT || 3004)

// ? Usamos metodos de express para permitir el formato json y para permitir recibir informacion a travez del protocolo http
app.use(express.urlencoded( {extends: false} ))
app.use(express.json())
app.use(cors())

// ? Permitimos el uso de las rutas para todos los endpoints
app.use(require('./routes/users.routes'))

// ? Exportamos el app
module.exports = app