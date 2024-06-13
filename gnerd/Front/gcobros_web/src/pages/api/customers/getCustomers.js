export default async function getCustomersFromGoogleWorkspace() {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/customers/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error.message || 'Error inesperado en el servidor.');
        }

        if (result.success && result.data) {
            return result.data;
        }
        return null;
    } catch (error) {
        throw new Error(error.message);
    }
}