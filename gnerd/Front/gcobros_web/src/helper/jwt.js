import jwtDecode from 'jwt-decode';

/**
 * Verifica la existencia y validez del JWT almacenado en localStorage.
 * @return {object|null} Retorna un objeto con datos del usuario si el token es válido, de lo contrario retorna null.
 */
export function getAdminData() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      return null;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const currentTime = Date.now() / 1000;
  
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return null;
      }
      return {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }