const createHttpResonse = (code: number, message: string, data: any) => {
    return {
        code: code,
        message: message,
        data: data
    }
}

export {
    createHttpResonse
}
