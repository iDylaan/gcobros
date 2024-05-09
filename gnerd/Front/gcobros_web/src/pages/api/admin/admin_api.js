export async function validateAdmin(email) {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/admin/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error.message || 'Error inesperado en el servidor.');
        }

        return result.success && result.data;
    } catch (error) {
        throw new Error(error.message);
    }
}