import sequelize, { Op } from 'sequelize';
import models from '../../models';
import IInvoiceDao from '../contracts/IInvoiceDao';
import SuperDao from './SuperDao';
import { getTimezoneVariable } from '../../config/timezone';
import { logger } from '../../config/logger';

const Invoice = models.invoice;

export default class InvoiceDao extends SuperDao implements IInvoiceDao {
    constructor() {
        super(Invoice);
    }

    async findOne(where: object) {
        return Invoice.findOne({ where });
    }

    /*
     * Add Date: 19th June, 2023
     * Modification Date: 19th June, 2023
     * Change By: Mohiuddin
     * Title: make a array for ordering data with this function
     * OrderBy : "a-z/z-a/cre-date/last-edit",
     * @return orderCriteria; ASC || DESC
     */
    makeOrderBy = async (orderBy) => {
        let orderCriteria;
        switch (orderBy) {
            case 'a-z':
                orderCriteria = [['name', 'ASC']];
                break;
            case 'z-a':
                orderCriteria = [['name', 'DESC']];
                break;
            case 'cre-date':
                orderCriteria = [['created_at', 'DESC']];
                break;
            case 'last-edit':
                orderCriteria = [['updated_at', 'DESC']];
                break;
            default:
                // Default ordering if orderBy is not provided or unrecognized
                orderCriteria = [['created_at', 'DESC']];
                break;
        }
        return orderCriteria;
    };

    // getSpecificInvoicePdfWithInvoiceContact
    async getSpecificInvoiceWithContact(where, attributes) {

        return Invoice.findOne({
            where,
            attributes: [...attributes],
        });
    }

}
