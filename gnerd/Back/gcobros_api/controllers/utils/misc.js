
export const handleResponse = (response) => {
    return {'success': true, 'data': response };
}

export const handleErrorResponse = (error) => {
    return {'success': false, 'error': error };
}