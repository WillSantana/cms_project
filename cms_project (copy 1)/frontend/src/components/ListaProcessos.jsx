import { useState, useMemo } from 'react'
import CardProcesso from './CardProcesso'

import FiltrosProcessos from './FiltrosProcessos'
import Paginacao from './Paginacao'
import processosData from '../data/processos.json'

export default function ListaProcessos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Lógica de filtragem
  const processosFiltrados = useMemo(() => {
    return processosData.filter((processo) => {
      const matchesSearch = 
        processo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processo.numEdital.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'Todos' || processo.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  // Lógica de paginação
  const totalPages = Math.ceil(processosFiltrados.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const processosPaginados = processosFiltrados.slice(startIndex, endIndex)

  // Reset para a primeira página quando os filtros mudam
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

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
          <p className="text-xl text-gray-500">Nenhum processo encontrado com os filtros selecionados.</p>
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
  )
}

