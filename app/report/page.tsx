'use client'

import { useState } from 'react'

export default function ReportPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'road_damage',
    latitude: 0,
    longitude: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Slanje izveštaja:', formData)
    // TODO: Integrate with Supabase
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Prijavi problem</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Naslov problema</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="npr. Rupa na putu"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Kategorija</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="road_damage">Oštećenje puta</option>
              <option value="pothole">Rupa na putu</option>
              <option value="traffic_sign">Problem sa saobraćajnom znakom</option>
              <option value="lighting">Problem sa osvetljenjem</option>
              <option value="other">Ostalo</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Opis problema</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detaljno opiši problem..."
              rows={4}
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Fotografija</label>
            <input type="file" accept="image/*" className="border border-gray-300 rounded-lg w-full p-2" />
          </div>

          <button type="submit" className="btn-primary w-full">
            Pošalji izveštaj
          </button>
        </form>
      </div>
    </div>
  )
}
