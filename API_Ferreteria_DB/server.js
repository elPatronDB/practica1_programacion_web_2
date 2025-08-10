import express from 'express';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';

const app = express();
const port = 3001;
app.use(express.json());

// Configuración de las rutas
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);

// Error del servidor si falla
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error del servidor' });
});

// Inicio del servidor
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));