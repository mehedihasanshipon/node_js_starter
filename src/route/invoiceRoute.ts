import { Router } from 'express';
import InvoiceController from '../controllers/InvoiceController';
import { verifyToken } from '../middlewares/verifyToken';
import InvoiceValidator from '../validator/InvoiceValidator';

/*
 * Add Date: 14th June, 2023
 * Modification Date: 14th June, 2023
 * Change By: Mohiuddin
 * Define {InvoiceFolderController} route controller here
 */
const router = Router();
/// All Controller
const invoiceController = new InvoiceController();

/// All Validation
const invoiceValidator = new InvoiceValidator();

router.get('/details', invoiceController.invoiceDetailsInformationData);

export default router;
