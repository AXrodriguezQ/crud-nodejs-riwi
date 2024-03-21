// todo: Agregando las dependencias que necesitamos
require('dotenv').config()
require('./database/db')

// ? Traemos la variable app que trae todo lo de express
const app = require('./server')

// ? Iniciamos un puerto de escucha para nuestro servidor
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`)
})