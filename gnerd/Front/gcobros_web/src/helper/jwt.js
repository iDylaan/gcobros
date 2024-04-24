import { jwtDecode } from "jwt-decode";
/**
 * Verifica la existencia y validez del JWT almacenado en localStorage.
 * @return {object|null} Retorna un objeto con datos del usuario si el token es válido, de lo contrario retorna null.
 */
export function getAdminData() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
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

export function jwtLogout() {
  localStorage.removeItem('token');
}

export const jwt = () => localStorage.getItem('token') || '';

export function verifyJWT(token) {
  try {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!SECRET_KEY) {
      throw new Error("JWT Secret Key is not defined.");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    return { valid: true, decoded };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { valid: false };
  }
}