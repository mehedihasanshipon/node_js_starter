import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { logger } from '../config/logger';
import InvoiceService from '../service/implementations/InvoiceService';

export default class InvoiceFolderController {
    private invoiceService: InvoiceService;

    // Initialize service in cosntructor
    constructor() {
        this.invoiceService = new InvoiceService();
    }

    /*
     * Add Date: 24th June, 2023
     * Modification Date: 24th June, 2023
     * Change By: Mohiuddin
     * Title: Delete  Invoice details information
     */
    invoiceDetailsInformationData = async (req: Request, res: Response) => {
        try {
            const responseData = await this.invoiceService.getInvoiceDetails(req);
            res.status(responseData.statusCode).send(responseData.response);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}
