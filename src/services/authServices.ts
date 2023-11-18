export const refreshToken = async () => {
  try {
    // Lógica para refrescar el token
    const newToken = await fetch('http://localhost:4000/api/auth/refresh', {
      credentials: 'include'
    });
    const data = await newToken.json();
    if (newToken.status === 201) {
      return data.refresh
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
  }
}