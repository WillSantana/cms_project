// src/services/api.js
import axios from "axios";

// Cria instância do axios conectando ao Django
const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para salvar token JWT no localStorage
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
}

// Função para login via JWT
export async function login(username, password) {
  try {
    const response = await axios.post("http://localhost:8000/api/token/", {
      username,
      password,
    });
    const { access } = response.data;
    setAuthToken(access);
    return access;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw error;
  }
}

// Recuperar token salvo ao iniciar app
const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthToken(savedToken);
}

export default api;
