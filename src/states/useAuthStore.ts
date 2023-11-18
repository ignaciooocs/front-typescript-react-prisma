import { create } from 'zustand';

interface IUseAuthStore {
  token: string | boolean | null,
  expiresIn: number | boolean
  setUser: (prop: { token: string | boolean, expiresIn: number | boolean }) => void
  refreshToken: () => void,
  error: string | boolean,
  setError: (prop: string | boolean) => void
}

// Crea una tienda de estado global con zustand
export const useAuthStore = create<IUseAuthStore>((set) => ({
  token: null,
  expiresIn: false,
  error: false,
  setUser: (prop: { token: string | boolean, expiresIn: number | boolean }) => set(() => ({ token: prop.token, expiresIn: prop.expiresIn })),
  setError: (prop: string | boolean) => set(() => ({ error: prop })),
  refreshToken: async () => {
    try {
      // Lógica para refrescar el token
      const newToken = await fetch('http://localhost:4000/api/auth/refresh', {
        credentials: 'include'
      });
      const data = await newToken.json();
      if (newToken.status === 201) {
        set({ token: data.refresh!, expiresIn: data.expiresIn! });
      } else {
        set({ token: false, expiresIn: false });
        throw data
      }
    } catch (error) {
      console.log(error)
    }
  }
}));