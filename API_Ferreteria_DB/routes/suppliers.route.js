
import { Router } from 'express';
import {
    getSuppliers,
    getSuppliersById,
    createSupplier,
    updateSupplier,
    deleteSupplier
} from '../controllers/supplierController.js';

const router = Router();
//const router = express.Router();

router.get('/', getSuppliers);
router.get('/:id', getSuppliersById);
router.post('/', createSupplier);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);
export default router;
