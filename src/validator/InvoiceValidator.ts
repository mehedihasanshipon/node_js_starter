/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi, { Schema, ValidationErrorItem } from 'joi';
import responseHandler from '../helper/responseHandler';

export default class InvoiceValidator {
    async invoiceListValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            folderId: Joi.number(),
            inTrash: Joi.boolean(),
            isArchived: Joi.boolean(),
            isFavorite: Joi.boolean(),
            orderBy: Joi.string(),
            searchText: Joi.string(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.query, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceCreateValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            name: Joi.string().required(),
            folderId: Joi.number().allow(null, ''),
            invoiceType: Joi.string().required(),
            orderId: Joi.number().allow(null),
            client: Joi.object().allow(null),
            dueDate: Joi.date().allow(null),
            inTrash: Joi.string().allow(null).min(1).max(40),
            invoiceDate: Joi.date().allow(null).min(1).max(40),
            isArchived: Joi.string().allow(null).min(1).max(40),
            isFavorite: Joi.string().allow(null).min(1).max(40),
            items: Joi.array().allow(null),
            logoOfCompany: Joi.string().allow(null),
            note: Joi.string().allow(null),
            termsAndCondition: Joi.string().allow(null),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceUpdateValidator(req: Request, res: Response, next: NextFunction) {
        const itemSchema = Joi.object({
            id: Joi.number(),
            description: Joi.string().allow(''),
            name: Joi.string().allow(null, ''),
            quantity: Joi.number().required(),
            price: Joi.number().required(),
            tax: Joi.number().required(),
            totalPrice: Joi.number().required(),
        });
        // create schema object
        const schema = Joi.object({
            id: Joi.number().required(),
            invoiceType: Joi.string().required(),
            client: Joi.object().required(),
            startDate: Joi.date().allow(null, ''),
            endDate: Joi.date().allow(null, ''),
            endDateStatus: Joi.string().allow(null, '').valid('BY', 'NEVER', 'AFTER'),
            dueDate: Joi.date().required(),
            orderId: Joi.string().max(50).allow(null, ''),
            inTrash: Joi.string().allow(null),
            invoiceDate: Joi.date().allow(null),
            logoOfCompany: Joi.string().allow('').allow(null),
            useSystemDefaultLogo: Joi.number().allow(null),
            items: Joi.array().items(itemSchema).required(),
            subTotal: Joi.number().required(),
            shippingCharge: Joi.number().required(),
            discount: Joi.number().required(),
            taxes: Joi.number().allow(null),
            taxPercentage: Joi.number().allow(null),
            totalAmountOfInvoice: Joi.number().required(),
            note: Joi.string().allow(null, ''),
            termsAndCondition: Joi.string().allow(null, ''),
            settings: Joi.object().required(),
            paymentMethods: Joi.array().allow(null, ''),
            repeatSettings: Joi.object().allow(null, ''),
            paymentTerms: Joi.object().allow(null, ''),
            taxName: Joi.string().allow(null, ''),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceFooterValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            id: Joi.number().required(),
            note: Joi.string().allow(null),
            termsAndCondition: Joi.string().allow(null),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceDeleteValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object

        const schema = Joi.object({
            ids: Joi.array().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceUpdateToggleFavoriteValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            id: Joi.number().required(),
            isFavorite: Joi.boolean().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceUpdateToggleArchiveValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            ids: Joi.array().required(),
            isArchived: Joi.boolean().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceUpdateToggleTrashValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            ids: Joi.array().required(),
            isTrashed: Joi.boolean().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    /*
     * Title: Check the validation for invoice items update.
     */
    invoiceItemsUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
        // Create schema object
        const itemSchema = Joi.object({
            id: Joi.number(),
            description: Joi.string().allow(''),
            name: Joi.string().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required(),
            tax: Joi.number().required(),
            totalPrice: Joi.number().required(),
        });

        const schema: Schema = Joi.object({
            id: Joi.number().required(),
            items: Joi.array().items(itemSchema).required(),
            shippingCharge: Joi.number().required(),
            discount: Joi.number().required(),
            totalAmountOfInvoice: Joi.number().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };
        // Validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage: string = error.details
                .map((detail: ValidationErrorItem) => detail.message)
                .join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);
        }
        // Replace req.body with validated value and trigger the next middleware function
        req.body = value;
        return next();
    };

    async invoiceIdValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            invoiceId: Joi.number().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.query, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceRenameValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            invoiceId: Joi.number().required(),
            name: Joi.string().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceCloneValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            invoiceId: Joi.number().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoicePaymentMethodValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            invoiceId: Joi.number().required(),
            paymentMethodIds: Joi.array().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceSettingsValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            invoiceId: Joi.number().required(),
            settings: Joi.object().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceRecurringSettingsValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            invoiceId: Joi.number().required(),
            settings: Joi.object().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceUpdateCompletedValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            ids: Joi.array().required(),
            isCompleted: Joi.string().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }

    async invoiceManualPaymentValidator(req: Request, res: Response, next: NextFunction) {
        // create schema object
        const schema = Joi.object({
            invoiceId: Joi.number().required(),
            childInvoiceId: Joi.number().allow(null, ''),
            paymentMode: Joi.string().required(),
            amount: Joi.number().allow(null, ''),
            note: Joi.string().allow(null, ''),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details.map((details) => details.message).join(', ');

            const responseData = responseHandler.returnError(httpStatus.BAD_REQUEST, errorMessage);
            return res.status(responseData.statusCode).send(responseData.response);

            // next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        return next();
    }
}
