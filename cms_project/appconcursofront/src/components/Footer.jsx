export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Páginas */}
          {/* <div>
            <h3 className="text-lg font-bold mb-4">Páginas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Início</a></li>
              <li><a href="#" className="hover:underline">A Cidade</a></li>
              <li><a href="#" className="hover:underline">Governo</a></li>
              <li><a href="#" className="hover:underline">Notícias</a></li>
              <li><a href="#" className="hover:underline">Serviços</a></li>
            </ul>
          </div> */}

          {/* Categorias
          <div>
            <h3 className="text-lg font-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Educação</a></li>
              <li><a href="#" className="hover:underline">Saúde</a></li>
              <li><a href="#" className="hover:underline">Obras</a></li>
              <li><a href="#" className="hover:underline">Assistência Social</a></li>
              <li><a href="#" className="hover:underline">Cultura</a></li>
            </ul>
          </div> */}

          {/* Acesso Rápido */}
          {/* <div>
            <h3 className="text-lg font-bold mb-4">Acesso Rápido</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Portal da Transparência</a></li>
              <li><a href="#" className="hover:underline">Ouvidoria</a></li>
              <li><a href="#" className="hover:underline">e-SIC</a></li>
              <li><a href="#" className="hover:underline">Diário Oficial</a></li>
              <li><a href="#" className="hover:underline">Processos e Concursos</a></li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>© 2025 Prefeitura Municipal de Ribeirão das Neves - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  )
}

