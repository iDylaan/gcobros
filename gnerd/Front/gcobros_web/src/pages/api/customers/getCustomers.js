import { jwt } from "../../../helper/jwt.js";
export default async function getCustomersFromGoogleWorkspace() {
    try {
        console.log('Antes de realizar el fetch');
        const response = await fetch('http://127.0.0.1:3001/api/customers/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${jwt()}`,
            },
        })
        console.log(response);

        console.log('Despues de realizar el fetch');
        
        console.log('Obteniendo la data');
        const result = await response.json();
        console.log(result);

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