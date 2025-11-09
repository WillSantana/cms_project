import { Calendar, Building2, FileText, ChevronRight, Mail, Phone } from 'lucide-react'
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

  return (
    <Link to={`/processo/${processo.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 w-full h-auto border border-gray-200 hover:border-accent group">
        {/* Cabeçalho */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`${getStatusColor(processo.status)} text-white text-xs font-semibold px-4 py-1 rounded-full`}>
                {processo.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors leading-snug">
              {processo.titulo}
            </h3>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
        </div>

        {/* Informações */}
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start gap-2">
            <FileText className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold">Cargo:</span>{' '}
              <span>{processo.cargo}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Building2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold">Órgão:</span>{' '}
              <span>{processo.orgao}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <FileText className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold">Edital:</span>{' '}
              <span>{processo.numEdital}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold">Telefone:</span>{' '}
              <span>{processo.telefone || 'Não informado'}</span>
            </div>
          </div>

          {/* Campo de E-mail */}
          <div className="flex flex-wrap items-center gap-1.5 text-gray-700">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
            <span className="font-semibold mr-1">E-mail:</span>
            <span className="break-all">{processo.email || 'Não informado'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
