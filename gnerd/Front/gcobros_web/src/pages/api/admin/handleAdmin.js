export async function activateAdmin(userId) {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/admin/activate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId
            })
        });

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

export async function desactivateAdmin(userId) {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/admin/desactivate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userId
            })
        });

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