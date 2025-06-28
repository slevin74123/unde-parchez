'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface ParkingSpot {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  available: number;
  total: number;
  price: string;
  rating: number;
  isFavorite: boolean;
  lastUpdated: string;
}

interface ParkingMapProps {
  parkingSpots: ParkingSpot[];
  onSpotClick?: (spot: ParkingSpot) => void;
  onSpotFavorite?: (spotId: number) => void;
}

export default function ParkingMap({ parkingSpots, onSpotClick, onSpotFavorite }: ParkingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  // Mock data pentru locurile de parcare în București
  const bucharestParkingSpots: ParkingSpot[] = [
    {
      id: 1,
      name: 'Piața Victoriei',
      address: 'Piața Victoriei 1, Sector 1, București',
      lat: 44.4517,
      lng: 26.0878,
      available: 5,
      total: 20,
      price: '5 RON/oră',
      rating: 4.8,
      isFavorite: false,
      lastUpdated: '2 min'
    },
    {
      id: 2,
      name: 'Centrul Vechi',
      address: 'Strada Lipscani 15, Sector 3, București',
      lat: 44.4317,
      lng: 26.1017,
      available: 12,
      total: 30,
      price: '8 RON/oră',
      rating: 4.5,
      isFavorite: true,
      lastUpdated: '1 min'
    },
    {
      id: 3,
      name: 'Piața Romana',
      address: 'Piața Romana 1, Sector 1, București',
      lat: 44.4477,
      lng: 26.0978,
      available: 0,
      total: 15,
      price: '6 RON/oră',
      rating: 4.2,
      isFavorite: false,
      lastUpdated: 'Acum'
    },
    {
      id: 4,
      name: 'Calea Victoriei',
      address: 'Calea Victoriei 45, Sector 1, București',
      lat: 44.4377,
      lng: 26.0878,
      available: 3,
      total: 25,
      price: '7 RON/oră',
      rating: 4.6,
      isFavorite: false,
      lastUpdated: '5 min'
    },
    {
      id: 5,
      name: 'Piața Unirii',
      address: 'Piața Unirii 1, Sector 3, București',
      lat: 44.4277,
      lng: 26.1078,
      available: 8,
      total: 40,
      price: '4 RON/oră',
      rating: 4.3,
      isFavorite: false,
      lastUpdated: '3 min'
    },
    {
      id: 6,
      name: 'Herăstrău',
      address: 'Șoseaua Nordului 1, Sector 1, București',
      lat: 44.4777,
      lng: 26.0778,
      available: 15,
      total: 50,
      price: '3 RON/oră',
      rating: 4.7,
      isFavorite: false,
      lastUpdated: '10 min'
    }
  ];

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 44.4268, lng: 26.1025 }, // Centrul Bucureștiului
            zoom: 13,
            styles: [
              {
                featureType: 'poi.parking',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
              }
            ],
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true
          });

          setMap(mapInstance);
          setInfoWindow(new google.maps.InfoWindow());

          // Adăugăm markerii pentru locurile de parcare
          const newMarkers: google.maps.Marker[] = [];
          const spotsToShow = parkingSpots.length > 0 ? parkingSpots : bucharestParkingSpots;

          spotsToShow.forEach((spot) => {
            const marker = new google.maps.Marker({
              position: { lat: spot.lat, lng: spot.lng },
              map: mapInstance,
              title: spot.name,
              icon: {
                url: spot.available > 0 
                  ? 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#22c55e" stroke="white" stroke-width="2"/>
                      <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${spot.available}</text>
                    </svg>
                  `)
                  : 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#ef4444" stroke="white" stroke-width="2"/>
                      <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">0</text>
                    </svg>
                  `),
                scaledSize: new google.maps.Size(24, 24),
                anchor: new google.maps.Point(12, 12)
              }
            });

            marker.addListener('click', () => {
              setSelectedSpot(spot);
              if (infoWindow) {
                const content = `
                  <div style="padding: 8px; max-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${spot.name}</h3>
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${spot.address}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin: 8px 0;">
                      <span style="color: ${spot.available > 0 ? '#22c55e' : '#ef4444'}; font-weight: bold;">
                        ${spot.available} din ${spot.total} libere
                      </span>
                      <span style="font-weight: bold;">${spot.price}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin: 4px 0;">
                      <span>⭐ ${spot.rating}</span>
                      <span style="font-size: 11px; color: #666;">${spot.lastUpdated}</span>
                    </div>
                    <div style="margin-top: 8px;">
                      <button onclick="window.navigateToSpot('${spot.name}')" 
                              style="background: #3b82f6; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer; margin-right: 4px;">
                        🧭 Navighează
                      </button>
                      <button onclick="window.toggleFavorite(${spot.id})" 
                              style="background: ${spot.isFavorite ? '#ef4444' : '#e5e7eb'}; color: ${spot.isFavorite ? 'white' : '#374151'}; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;">
                        ${spot.isFavorite ? '♥' : '♡'}
                      </button>
                    </div>
                  </div>
                `;
                infoWindow.setContent(content);
                infoWindow.open(mapInstance, marker);
              }
            });

            newMarkers.push(marker);
          });

          setMarkers(newMarkers);

          // Adăugăm funcții globale pentru butoanele din info window
          (window as any).navigateToSpot = (spotName: string) => {
            onSpotClick?.({ ...spotsToShow.find(s => s.name === spotName)! });
            infoWindow?.close();
          };

          (window as any).toggleFavorite = (spotId: number) => {
            onSpotFavorite?.(spotId);
            infoWindow?.close();
          };
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

    return () => {
      // Cleanup markers
      markers.forEach(marker => marker.setMap(null));
    };
  }, [parkingSpots, onSpotClick, onSpotFavorite]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-96 rounded-lg" />
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <div className="font-semibold mb-2">Legendă</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Disponibil</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Ocupat</span>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <div className="font-semibold mb-1">Statistici</div>
        <div className="text-gray-600">
          {parkingSpots.length > 0 ? parkingSpots.length : bucharestParkingSpots.length} locuri monitorizate
        </div>
        <div className="text-green-600 font-medium">
          {(parkingSpots.length > 0 ? parkingSpots : bucharestParkingSpots).filter(s => s.available > 0).length} disponibile
        </div>
      </div>
    </div>
  );
} 