const API_BASE_URL = process.env.NEXT_PUBLIC_HOST;

const getAllAdmins = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/directory/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        console.log('Response: ', response)
        const result = await response.json();
        console.log('Result: ', result)

        if (!response.ok) {
            throw new Error('Error en el servidor');
        }

        if (!result.success) {
            throw new Error(result.error.message);
        }

        return result.data
    } catch (error) {
        console.log(error);
        return [];
    }
}


module.exports = {
    getAllAdmins
}