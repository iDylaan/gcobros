
const handleResponse = (response) => {
    return { 'success': true, 'data': response };
}

const handleErrorResponse = (error) => {
    return { 'success': false, 'error': error };
}

module.exports = {
    handleResponse,
    handleErrorResponse
}