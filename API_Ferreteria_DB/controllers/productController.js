import { v4 as uuidv4 } from 'uuid';
import products from '../mock-data/products.json' assert { type: 'json' };
import suppliers from '../mock-data/suppliers.json' assert { type: 'json' };

export const getProducts = async (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos: ' + error.message });
  }
};



//POST -Productos
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = { id: `PRD-${uuidv4().slice(0, 8)}`, ...productData };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto: ' + error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    const productData = req.body;
    if (productData.supplierId && !suppliers.find(sup => sup.id === productData.supplierId)) {
      return res.status(400).json({ message: 'Proveedor no encontrado' });
    }
    products[index] = { ...products[index], ...productData };
    res.status(200).json(products[index]);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto: ' + error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    products.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto: ' + error.message });
  }
};