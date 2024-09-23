import { Request } from 'express';
import { ApiServiceResponse } from '../../@types/apiServiceResponse';
import { IInvoice } from '../../models/db_invoice/interfaces/IInvoice';

export default interface IInvoiceService {
    getInvoiceDetails: (req: Request) => Promise<ApiServiceResponse>;
}
