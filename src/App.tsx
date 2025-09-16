import { MainLayout } from './layouts/MainLayout'

function App() {
  return (
    <MainLayout>
      {/* El contenido de tu página irá aquí */}
      <h1 className="text-2xl font-bold text-gray-800">Contenido de la Página</h1>
      <p className="text-gray-600">
        Este es el área donde irán los paneles del menú y la orden.
      </p>
    </MainLayout>
  )
}

export default App
