/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import { Request } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';
import path from 'path';
import { Op, Sequelize } from 'sequelize';
import util from 'util';
import { Json } from 'sequelize/types/utils';
import { logger } from '../../config/logger';
import InvoiceDao from '../../dao/implementations/InvoiceDao';
import responseHandler from '../../helper/responseHandler';
import IInvoiceService from '../contracts/IInvoiceService';


export default class InvoiceService implements IInvoiceService {
    private invoiceDao: InvoiceDao;

    // Initialize dao in cosntructor
    constructor() {
        this.invoiceDao = new InvoiceDao();
    }

    /*
     * Add Date: 24th June, 2023
     * Modification Date: 24th June, 2023
     * Change By: Mohiuddin
     * Title: Get Invoice Details information by invoice id  from invoiceDao .
     * Call findOneByWhere() from invoiceDao(data object)
     * Return: Json data
     */
    getInvoiceDetails = async (req) => {
        try {
            let message = 'Successfully found invoice details info';
            const where = { id: 1 };

            const attributes = ['id', 'name'];

            // Get all data from datatable with this method
            // const response = await this.invoiceDao.findOneByWhere(where, attributes);
            const response = await this.invoiceDao.getSpecificInvoiceWithContact(where, attributes);
            if (!response) {
                message = 'Invoice details data not found! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Successfully found invoice details info',
                response
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong');
        }
    };
}
