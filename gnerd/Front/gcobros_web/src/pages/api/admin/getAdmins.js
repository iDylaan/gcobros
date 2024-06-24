export async function adminSignIn(email, password) {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/admins/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error.message || 'Error inesperado en el servidor.');
        }

        if (result.success && result.data) {
            const token = result.data.token;
            localStorage.setItem('token', token);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function getAdmins() {
    try {
        const response = await fetch('http://127.0.0.1:3001/api/admin/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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