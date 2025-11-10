import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Building2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DocumentAccordion from '../components/DocumentAccordion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import processosData from '../data/processos.json'

export default function ProcessoDetalhes() {
  const { id } = useParams()
  const processo = processosData.find(p => p.id === parseInt(id))

  if (!processo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Processo não encontrado</h1>
            <Link to="/">
              <Button>Voltar para a lista</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar para a lista
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className={`${getStatusColor(processo.status)} text-white text-sm font-semibold px-4 py-2 rounded-full`}>
                {processo.status}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-primary mb-6">{processo.titulo}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-accent mt-1" />
                <div>
                  <p className="font-semibold text-gray-700">Cargo</p>
                  <p className="text-lg">{processo.cargo}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-6 h-6 text-accent mt-1" />
                <div>
                  <p className="font-semibold text-gray-700">Órgão</p>
                  <p className="text-lg">{processo.orgao}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-accent mt-1" />
                <div>
                  <p className="font-semibold text-gray-700">Número do Edital</p>
                  <p className="text-lg">{processo.numEdital}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-accent mt-1" />
                <div>
                  <p className="font-semibold text-gray-700">Data Limite</p>
                  <p className="text-lg">{formatDate(processo.dataLimite)}</p>
                </div>
              </div>
            </div>
	
	            {/* Seção de Documentos com Acordeão */}
	            {processo.documentos && processo.documentos.length > 0 && (
	              <div className="border-t pt-6 mt-8">
	                <h2 className="text-xl font-bold text-primary mb-4">Documentos e Publicações</h2>
	                <div className="space-y-4">
	                  {processo.documentos.map((docSection, index) => (
	                    <DocumentAccordion 
	                      key={index}
	                      title={docSection.titulo}
	                      documents={docSection.links}
	                    />
	                  ))}
	                </div>
	              </div>
	            )}

            {processo.status === 'Aberto' && (
              <div className="mt-8">
                {/* <Button className="w-full md:w-auto" size="lg">
                  Fazer Inscrição
                </Button> */}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

