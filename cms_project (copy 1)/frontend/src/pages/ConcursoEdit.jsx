import { useEffect, useState } from "react";
import { getConcurso, updateConcurso } from "../services/concursos";
import { useParams, useNavigate } from "react-router-dom";

export default function ConcursoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    getConcurso(id).then(setForm);
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateConcurso(id, form);
    alert("Concurso atualizado!");
    navigate("/dashboard");
  }

  if (!form) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Editar Concurso</h2>
      <form onSubmit={handleSubmit}>
        <input name="titulo" value={form.titulo} onChange={handleChange} /><br/>
        <input name="cargo" value={form.cargo} onChange={handleChange} /><br/>
        <input name="orgao" value={form.orgao} onChange={handleChange} /><br/>
        <input name="numEdital" value={form.numEdital} onChange={handleChange} /><br/>
        <input name="telefone" value={form.telefone} onChange={handleChange} /><br/>
        <input name="email" value={form.email} onChange={handleChange} /><br/>

        <button type="submit">Salvar</button>
      </form>

      <button onClick={() => navigate("/dashboard")}>Voltar</button>
    </div>
  );
}
