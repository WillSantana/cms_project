import { useState } from 'react'
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'

/**
 * Componente de acordeão reutilizável para listar documentos.
 * @param {object} props
 * @param {string} props.title - Título do acordeão (ex: "CONVOCAÇÃO").
 * @param {Array<{label: string, url: string}>} props.documents - Lista de documentos/links.
 */
export default function DocumentAccordion({ title, documents }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4">
      {/* Cabeçalho do Acordeão */}
      <button
        className="flex justify-between items-center w-full p-4 bg-primary text-white font-bold rounded-t-lg transition-colors duration-200 hover:bg-blue-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="uppercase">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {/* Conteúdo do Acordeão */}
      {isOpen && (
        <div className="p-4 bg-white rounded-b-lg">
          <ul className="list-disc pl-5 space-y-2">
            {documents.map((doc, index) => (
              <li key={index} className="text-gray-700">
                <a 
                  href={doc.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2 transition-colors duration-200"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
