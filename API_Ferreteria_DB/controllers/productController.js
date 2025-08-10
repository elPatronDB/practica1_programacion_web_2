let products = [];
let suppliers = [];

import('../mock-data/products.json').then(module => {
  products = module.default;
}).catch(err => {
  console.error('Error al cargar products.json:', err);
});

import('../mock-data/suppliers.json').then(module => {
  suppliers = module.default;
}).catch(err => {
  console.error('Error al cargar suppliers.json:', err);
});
// GET - Productos
export const getProducts = async (req, res) => {
  try {
    let response = {
      products: products,
      count: products.length
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener productos: ' + error.message });
  }
};

// GET - Producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener producto: ' + error.message });
  }
};

// POST - Productos
export const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = products.find(p => p.id === newProduct.id);
    let response = {};

    if (product) {
      response = { message: 'El producto ya existe' };
      return res.status(400).json(response);
    }

    if (newProduct.name === undefined || newProduct.name === '') {
      response = { message: 'El nombre del producto es obligatorio' };
      return res.status(400).json(response);
    }

    products.push(newProduct);
    
    response = {
      message: 'Producto creado exitosamente',
      product: newProduct
    };
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear producto: ' + error.message });
  }
};

// PUT - Productos
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
    console.error(error);
    return res.status(400).json({ message: 'Error al actualizar producto: ' + error.message });
  }
};

// DELETE - Productos
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
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar producto: ' + error.message });
  }
};