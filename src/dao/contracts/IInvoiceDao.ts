import { IInvoice } from '../../models/db_invoice/interfaces/IInvoice';

export default interface IInvoiceDao {
    findOne: (where: object) => Promise<IInvoice>;
}
