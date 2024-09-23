export declare type ApiServiceResponse = {
    [x: string]: any;
    statusCode: number;
    response: {
        success: boolean;
        responseCode: number;
        message: string;
        data?: [] | object;
    };
};

export declare type DataTableResponse = {
    currentPage: number;
    count: number;
    limit: number;
    nextPage: number;
    totalPages: number;
    content: Partial<object[]>;
};

export declare type DataTableDaoResponse = { count: number; rows: Partial<object[]> };
