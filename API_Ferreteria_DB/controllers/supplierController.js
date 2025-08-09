import suppliers from '../mock-data/suppliers.json' assert { type: 'json' };

export const getSuppliers = (req, res) => {
    res.json(suppliers);
};

export const getSupplierById = (req, res) => {
    const { id } = req.params;
    const supplier = suppliers.find(s => s.id === parseInt(id));
    if (supplier) {
        res.json(supplier);
    } else {
        res.status(404).send('Proveedor no encontrado');
    }
};


export const createSupplier = (req, res) => {
    const newSupplier = req.body;
    suppliers.push(newSupplier);
    res.status(201).json(newSupplier);
};


export const updateSupplier = (req, res) => {
    const { id } = req.params;
    const index = suppliers.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        suppliers[index] = { ...suppliers[index], ...req.body };
        res.json(suppliers[index]);
    } else {
        res.status(404).send('Proveedor no encontrado');
    }
};


export const deleteSupplier = (req, res) => {
    const { id } = req.params;
    const index = suppliers.findIndex(s => s.id === parseInt(id));
    if (index !== -1) {
        suppliers.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Proveedor no encontrado');
    }
};


