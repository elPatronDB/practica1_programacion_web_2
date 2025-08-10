import { suppliers } from  '../mock-data/suppliers.json' assert { type: 'json' };


// GET - proveedores
export const getsuppliers = async (req, res) => {
  try {
    let response ={
      suppliers: suppliers,
      count: suppliers.length
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener proveedores: ' + error.message });
  }
};



// GET - proveedor por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = suppliers.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ message: 'proveedor no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener proveedor: ' + error.message });
  }
}



//POST -proveedores
export const createProduct = async (req, res) => {
  try {
    
    const newSupplier = req.body;
    const product = suppliers.find(p => p.id === newSupplier.id);
    let response = {}
    
    if (product) {
      response = { message: 'El proveedor ya existe' };
      return res.status(400).json(response);
    }

    if (newSupplier.supplierName === undefined || newSupplier.supplierName === '') {
      response = { message: 'El nombre del proveedor es obligatorio' };
      return res.status(400).json(response);
    }

    suppliers.push(newSupplier);
    
    response = {
      message: 'proveedor creado exitosamente',
      product: newSupplier
    };
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear proveedor: ' + error.message });
  }
};



// PUT - proveedores
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const index = suppliers.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'proveedor no encontrado' });
    }
    const supplierData = req.body;
    if (supplierData.supplierId && !suppliers.find(sup => sup.id === supplierData.supplierId)) {
      return res.status(400).json({ message: 'Proveedor no encontrado' });
    }
    suppliers[index] = { ...suppliers[index], ...supplierData };
    res.status(200).json(suppliers[index]);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar proveedor: ' + error.message });
  }
};



// DELETE - proveedores
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const index = suppliers.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'proveedor no encontrado' });
    }
    suppliers.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar proveedor: ' + error.message });
  }
};