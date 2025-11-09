import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, sector, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: 30 }}>
      <h2>Dashboard da Secretaria</h2>
      <p>Usuário: {user?.username}</p>
      <p>Setor: {sector || "Geral"}</p>

      <button onClick={logout}>Sair</button>
    </div>
  );
}
