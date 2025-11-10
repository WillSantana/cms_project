import Header from '../components/Header'
import Footer from '../components/Footer'
import ListaProcessos from '../components/ListaProcessos'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <ListaProcessos />
      </main>
      <Footer />
    </div>
  )
}

