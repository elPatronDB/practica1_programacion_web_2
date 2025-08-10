let suppliers = [];

import('../mock-data/suppliers.json').then(module => {
  suppliers = module.default;
}).catch(err => {
  console.error('Error al cargar suppliers.json:', err);
});

// GET - Proveedores
export const getSuppliers = async (req, res) => {
  try {
    let response = {
      suppliers: suppliers,
      count: suppliers.length
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener proveedores: ' + error.message });
  }
};

// GET - Proveedor por ID
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = suppliers.find(s => s.id === id);
    if (!supplier) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener proveedor: ' + error.message });
  }
};

// POST - Proveedores
export const createSupplier = async (req, res) => {
  try {
    const newSupplier = req.body;
    const supplier = suppliers.find(s => s.id === newSupplier.id);
    let response = {};

    if (supplier) {
      response = { message: 'El proveedor ya existe' };
      return res.status(400).json(response);
    }

    if (newSupplier.name === undefined || newSupplier.name === '') {
      response = { message: 'El nombre del proveedor es obligatorio' };
      return res.status(400).json(response);
    }

    suppliers.push(newSupplier);
    
    response = {
      message: 'Proveedor creado exitosamente',
      supplier: newSupplier
    };
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear proveedor: ' + error.message });
  }
};

// PUT - Proveedores
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const index = suppliers.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    const supplierData = req.body;
    suppliers[index] = { ...suppliers[index], ...supplierData };
    res.status(200).json(suppliers[index]);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al actualizar proveedor: ' + error.message });
  }
};

// DELETE - Proveedores
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const index = suppliers.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    suppliers.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar proveedor: ' + error.message });
  }
};