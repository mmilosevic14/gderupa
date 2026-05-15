'use client'

import L from 'leaflet'
import { useEffect, useRef } from 'react'

const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

// Fix Leaflet marker icons
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

interface Report {
  id: string
  title: string
  description: string
  latitude: number
  longitude: number
  category: string
  status: string
  photo_url?: string
}

export default function MapComponent({ reports = [] }: { reports?: Report[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)

  // Default center to Serbia (Belgrade area)
  const center: [number, number] = [44.8176, 20.4554]

  useEffect(() => {
    const container = containerRef.current

    if (!container || mapRef.current) {
      return
    }

    const map = L.map(container, {
      center,
      zoom: 7,
      preferCanvas: true,
      fadeAnimation: false,
      zoomAnimation: false,
      markerZoomAnimation: false,
    })

    L.tileLayer(OSM_TILE_URL, {
      attribution: OSM_ATTRIBUTION,
      updateWhenIdle: true,
      keepBuffer: 2,
    }).addTo(map)

    markersLayerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    return () => {
      markersLayerRef.current?.clearLayers()
      markersLayerRef.current = null
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const markersLayer = markersLayerRef.current

    if (!map || !markersLayer) {
      return
    }

    markersLayer.clearLayers()

    reports.forEach((report) => {
      const marker = L.marker([report.latitude, report.longitude])
      const popupHtml = `
        <div class="text-sm">
          <h3 class="font-bold text-sm">${report.title}</h3>
          <p class="text-gray-600 text-xs">${report.description.substring(0, 100)}...</p>
          <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mt-2">${report.category}</span>
          <span class="inline-block ml-2 px-2 py-1 rounded text-xs ${
            report.status === 'resolved'
              ? 'bg-green-100 text-green-800'
              : report.status === 'in_progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }">${report.status}</span>
        </div>
      `

      marker.bindPopup(popupHtml)
      marker.addTo(markersLayer)
    })
  }, [reports])

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}
