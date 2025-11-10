import { useState } from "react";
import { login } from "../services/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(username, password);
      setMessage("✅ Login realizado com sucesso!");
      window.location.href = "/"; // redireciona para home
    } catch {
      setMessage("❌ Usuário ou senha inválidos");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Acesso ao Sistema
        </h2>

        <input
          type="text"
          placeholder="Usuário"
          className="border p-2 w-full mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>

        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
}
