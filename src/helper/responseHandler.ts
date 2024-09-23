import {
    ApiServiceResponse,
    DataTableDaoResponse,
    DataTableResponse,
} from '../@types/apiServiceResponse';

const logError = (err) => {
    console.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
    logError(err);
    next(err);
};

const returnError = (statusCode: number, message: string) => {
    const response: ApiServiceResponse = {
        statusCode,
        response: {
            success: false,
            responseCode: statusCode,
            message,
        },
    };
    return response;
};
const returnSuccess = (statusCode: number, message: string, data?: [] | object) => {
    const response: ApiServiceResponse = {
        statusCode,
        response: {
            success: true,
            message,
            responseCode: statusCode,
            data,
        },
    };
    return response;
};

const getPaginationData = (rows: DataTableDaoResponse, page: number, limit: number) => {
    const { count: totalItems, rows: content } = rows;
    const currentPage = page ? +page : 0;

    const totalPages = Math.ceil(totalItems / limit);
    let nextPage = page;
    if (totalPages > page) {
        nextPage = page + 1;
    }
    const count = totalItems;

    const response: DataTableResponse = {
        content,
        currentPage,
        count,
        limit,
        nextPage,
        totalPages,
    };

    return response;
};

export default {
    logError,
    logErrorMiddleware,
    returnError,
    returnSuccess,
    getPaginationData,
};
