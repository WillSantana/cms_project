import { Calendar, Building2, FileText, ChevronRight } from 'lucide-react'


import { Link } from 'react-router-dom'

export default function CardProcesso({ processo }) {
  const getStatusColor = (status) => {
    const colors = {
      'Aberto': 'bg-green-500',
      'Inscrições Abertas': 'bg-green-500',
      'Em Andamento': 'bg-blue-500',
      'Encerrado': 'bg-gray-500',
      'Homologado': 'bg-purple-500'
    }
    return colors[status] || 'bg-gray-500'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <Link to={`/processo/${processo.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-accent group">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`${getStatusColor(processo.status)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                {processo.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
              {processo.titulo}
            </h3>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <FileText className="w-5 h-5 text-accent" />
            <span className="font-semibold">Cargo:</span>
            <span>{processo.cargo}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Building2 className="w-5 h-5 text-accent" />
            <span className="font-semibold">Órgão:</span>
            <span>{processo.orgao}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FileText className="w-5 h-5 text-accent" />
            <span className="font-semibold">Edital:</span>
            <span>{processo.numEdital}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5 text-accent" />
            <span className="font-semibold">Data Limite:</span>
            <span>{formatDate(processo.dataLimite)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

