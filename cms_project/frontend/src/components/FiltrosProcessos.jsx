import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function FiltrosProcessos({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) {
  const statusOptions = [
    { value: 'Todos', label: 'Todos' },
    { value: 'Aberto', label: 'Inscrições Abertas' },
    { value: 'Em Andamento', label: 'Em Andamento' },
    { value: 'Encerrado', label: 'Encerrado' },
    { value: 'Homologado', label: 'Homologado' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Campo de busca */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar por título, cargo ou edital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Filtros de status */}
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((option) => (
           <Button
  key={option.value}
  variant={statusFilter === option.value ? 'default' : 'outline'}
  onClick={() => setStatusFilter(option.value)}
  className={`text-sm transition-colors ${
    statusFilter === option.value
      ? 'bg-[#046EB4] text-white hover:bg-[#035a94]'
      : 'hover:bg-[#046EB4] hover:text-white'
  }`}
>
  {option.label}
</Button>

          ))}
        </div>
      </div>
    </div>
  )
}

