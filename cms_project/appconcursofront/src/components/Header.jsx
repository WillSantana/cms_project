import { Search, FileText, Users, Phone, MapPin } from 'lucide-react'
import brasao from '../assets/brasao.png'

export default function Header() {
  return (
    <header className="w-full">
      {/* Barra de navegação superior */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              (31) 3627-7000
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Ribeirão das Neves - MG
            </span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Transparência</a>
            <a href="#" className="hover:underline">Ouvidoria</a>
            <a href="#" className="hover:underline">e-SIC</a>
          </div>
        </div>
      </div>

      {/* Banner principal */}
      <div className="bg-white border-b-4 border-accent">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={brasao} alt="Brasão de Ribeirão das Neves" className="h-20 w-20 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-primary">RIBEIRÃO DAS NEVES</h1>
              <p className="text-lg text-gray-600">PREFEITURA | 2025 - 2028</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* Ícones de acesso rápido */}
      <div className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-6 justify-center">
            {/* <a href="#" className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
              <FileText className="w-8 h-8" />
              <span className="text-sm font-medium">Notícias</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
              <Search className="w-8 h-8" />
              <span className="text-sm font-medium">Consultar Processos</span>
            </a>
            <a href="#" className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
              <Users className="w-8 h-8" />
              <span className="text-sm font-medium">Serviços</span>
            </a> */}
          </div>
        </div>
      </div>
    </header>
  )
}

