//Imports de dependencias
import express from 'express'; 
import routes from './routes/index.route.js';

// Importación de rutas
// const productRoutes = require('./routes/product.routes.js');
// const supplierRoutes =require('./routes/supplier.routes.js');

// Inicialización de la aplicación Express
const app = express();
const port = 3001;
app.use(express.json());

// Configuración de las rutas
app.use('/',routes);

//Error del servidor si falla
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor')});

// Inicio del servidor
app.listen(port, () => console.log('Servidor Iniciado'));

