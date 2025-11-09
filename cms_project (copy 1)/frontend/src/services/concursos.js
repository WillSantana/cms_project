import api from "./api";

export async function getConcursosAdmin() {
  const res = await api.get("/concursos/");
  return res.data;
}

export async function getConcurso(id) {
  const res = await api.get(`/concursos/${id}/`);
  return res.data;
}

export async function createConcurso(data) {
  const res = await api.post("/concursos/", data);
  return res.data;
}

export async function updateConcurso(id, data) {
  const res = await api.put(`/concursos/${id}/`, data);
  return res.data;
}

export async function deleteConcurso(id) {
  return api.delete(`/concursos/${id}/`);
}
