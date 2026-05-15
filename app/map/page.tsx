'use client'

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-4">Mapa Problema</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">
            Mapa će biti prikazana ovde nakon konfiguracije Mapbox ili Leaflet
          </p>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <span className="text-gray-500 text-xl">🗺️ Mesto za mapu</span>
          </div>
        </div>
      </div>
    </div>
  )
}
