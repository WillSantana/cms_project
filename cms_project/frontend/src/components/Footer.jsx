import logoSti from '../assets/logo-sti.png'

export default function Footer() {
  return (
    <footer className="bg-[#046EB4] text-white mt-12">
      {/* Container principal */}
      <div className="w-full px-4 py-6 flex flex-col items-center">
        
        {/* Logo + Texto STI */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-3">
          <img 
            src={logoSti}
            alt="Logo STI"
            className="h-[50px] md:h-[70px] w-auto object-contain"
          />
          <span className="text-sm md:text-base font-medium text-center md:text-left">
            STI - Superintendência de Tecnologia da Informação
          </span>
        </div>
      </div>

      {/* Linha divisória */}
      <div className="w-full border-t border-white/50"></div>

      {/* Direitos autorais */}
      <div className="w-full text-center py-3">
        <p className="text-xs md:text-sm opacity-90">
          © 2025 Prefeitura Municipal de Ribeirão das Neves - Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
