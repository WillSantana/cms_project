import { useState } from "react";
import { createConcurso } from "../services/concursos";
import { useNavigate } from "react-router-dom";

export default function ConcursoCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    cargo: "",
    orgao: "",
    numEdital: "",
    telefone: "",
    email: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createConcurso(form);
    alert("Concurso criado com sucesso!");
    navigate("/dashboard");
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Novo Concurso</h2>
      <form onSubmit={handleSubmit}>
        <input name="titulo" placeholder="Título" onChange={handleChange} /><br/>
        <input name="cargo" placeholder="Cargo" onChange={handleChange} /><br/>
        <input name="orgao" placeholder="Órgão" onChange={handleChange} /><br/>
        <input name="numEdital" placeholder="Número do Edital" onChange={handleChange} /><br/>
        <input name="telefone" placeholder="Telefone" onChange={handleChange} /><br/>
        <input name="email" placeholder="Email" onChange={handleChange} /><br/>

        <button type="submit">Salvar</button>
      </form>

      <button onClick={() => navigate("/dashboard")}>Voltar</button>
    </div>
  );
}
