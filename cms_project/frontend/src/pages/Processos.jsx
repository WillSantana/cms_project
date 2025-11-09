import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import CardProcesso from "../components/CardProcesso";
import FiltrosProcessos from "../components/FiltrosProcessos";
import Paginacao from "../components/Paginacao";

export default function Processos() {
  const [processos, setProcessos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  async function loadConcursos() {
    try {
      const res = await api.get("/public/concursos/"); // ✅ ROTA CORRETA
      console.log("Concursos carregados:", res.data);
      setProcessos(res.data);
    } catch (err) {
      console.error("Erro ao carregar concursos:", err);
    }
  }

  useEffect(() => {
    loadConcursos();
  }, []);

  const processosFiltrados = useMemo(() => {
    return processos.filter((processo) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        processo.titulo?.toLowerCase().includes(search) ||
        processo.cargo?.toLowerCase().includes(search) ||
        processo.numEdital?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "Todos" || processo.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [processos, searchTerm, statusFilter]);

  const totalPages = Math.ceil(processosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const processosPaginados = processosFiltrados.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => setCurrentPage(1), [searchTerm, statusFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Concursos e Processos Seletivos
      </h2>

      <FiltrosProcessos
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {processosFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            Nenhum processo encontrado com os filtros selecionados.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {processosPaginados.map((p) => (
              <CardProcesso key={p.id} processo={p} />
            ))}
          </div>

          <Paginacao
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
