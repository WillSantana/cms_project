// src/services/publicConcursos.js
import api from "./api";

export async function getConcursosPublic() {
  const res = await api.get("/public/concursos/");
  return res.data;
}
