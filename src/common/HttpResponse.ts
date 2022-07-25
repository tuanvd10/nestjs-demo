const createHttpResonse = (code: number, message: string, data: any) => {
    return {
        statusCode: code,
        message: message,
        data: data,
    };
};

export { createHttpResonse };
