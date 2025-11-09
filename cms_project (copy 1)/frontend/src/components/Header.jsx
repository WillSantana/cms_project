import { Phone, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import brasao from '../assets/brasao.png'

export default function Header() {
  return (
    <header className="w-full">
      {/* Barra de navegação superior */}
      <div className="bg-[#046EB4] text-white border-b border-white/30">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:justify-between md:items-center text-sm text-center md:text-left gap-2 md:gap-0">
          
          {/* Telefone */}
          <div className="flex justify-center md:justify-start items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>(31) 3627-7000</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            <a
              href="https://ribeiraodasneves.mg.gov.br/portal-transparencia-neves/"
              className="hover:underline"
            >
              Transparência
            </a>
            <a
              href="https://ribeiraodasneves.mg.gov.br/ouvidoria/"
              className="hover:underline"
            >
              Ouvidoria
            </a>
            <a
              href="https://ribeiraodasneves.mg.gov.br/e-sic-acesso-a-informacao/"
              className="hover:underline"
            >
              e-SIC
            </a>
          </div>
        </div>
      </div>

      {/* Banner principal */}
      <div className="bg-[#046EB4] text-white shadow-lg shadow-[#035a94]/30">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* 🔙 Botão de voltar */}
            <Link
              to="https://ribeiraodasneves.mg.gov.br/"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#035a94] transition"
              title="Voltar"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>

            {/* Brasão e informações */}
            <div className="flex items-center gap-4">
              <img
                src={brasao}
                alt="Brasão de Ribeirão das Neves"
                className="h-[90px] md:h-[110px] w-auto object-contain"
              />
              <div>
                <a
                  href="https://ribeiraodasneves.mg.gov.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1 className="text-2xl font-bold hover:underline">
                    RIBEIRÃO DAS NEVES
                  </h1>
                </a>
                <p className="text-lg">PREFEITURA | 2025 - 2028</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de ícones de acesso rápido (opcional) */}
      <div className="bg-[#046EB4] text-white shadow-lg shadow-[#035a94]/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-6 justify-center">
            {/* Ícones de acesso rápido (opcional) */}
          </div>
        </div>
      </div>
    </header>
  )
}
