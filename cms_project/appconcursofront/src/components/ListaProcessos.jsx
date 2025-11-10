import { useState, useEffect, useMemo } from "react";
import CardProcesso from "./CardProcesso";
import FiltrosProcessos from "./FiltrosProcessos";
import Paginacao from "./Paginacao";
import api from "../services/api";

export default function ListaProcessos() {
  const [processos, setProcessos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  // ✅ Buscar dados reais da API Django
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("concursos/");
        setProcessos(response.data);
      } catch (err) {
        console.error("Erro ao buscar concursos:", err);
        setError("Erro ao conectar ao servidor.");
      }
    }
    fetchData();
  }, []);

  // 🔍 Filtragem dinâmica
  const processosFiltrados = useMemo(() => {
    return processos.filter((processo) => {
      const titulo = processo.titulo?.toLowerCase() || "";
      const cargo = processo.cargo?.toLowerCase() || "";
      const edital = processo.numero_edital?.toLowerCase() || "";
      const status = processo.status || "";

      const matchesSearch =
        titulo.includes(searchTerm.toLowerCase()) ||
        cargo.includes(searchTerm.toLowerCase()) ||
        edital.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "Todos" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [processos, searchTerm, statusFilter]);

  // 📄 Paginação
  const totalPages = Math.ceil(processosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const processosPaginados = processosFiltrados.slice(startIndex, endIndex);

  // 🔁 Reset página ao alterar filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

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

      {error ? (
        <div className="text-center py-12">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      ) : processosFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            Nenhum processo encontrado com os filtros selecionados.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {processosPaginados.map((processo) => (
              <CardProcesso key={processo.id} processo={processo} />
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
