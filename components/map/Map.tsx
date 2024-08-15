'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { Previas } from '@/types/data';
import { useCallback, useEffect, useState } from 'react';
import MapInfoWindow from './MapInfoWindows';
import {
  defaultMapCenter,
  defaultMapContainerStyle,
  defaultMapOptions,
  defaultMapZoom,
} from '@/lib/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { handleQueryParams } from '@/lib/utils';

type MapComponentProps = {
  previas?: Previas[];
};

export default function MapComponent({ previas }: MapComponentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedPrevia, setSelectedPrevia] = useState<Previas | undefined>(undefined);
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const [selectedPoint, setSelectedPoint] = useState<{ lat: number; lng: number } | null>(null);

  const handleMarkerClick = useCallback((previa: Previas) => {
    setSelectedPrevia(previa);
  }, []);

  const handleInfoWindowCloseClick = useCallback(() => {
    setSelectedPrevia(undefined);
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const latLng = event.latLng.toJSON();
      setSelectedPoint(latLng);
      handleQueryParams({
        searchParams,
        pathname,
        replace,
        values: [
          {
            value: latLng.lat.toString(),
            query: 'lat',
          },
          {
            value: latLng.lng.toString(),
            query: 'lng',}
        ],
      });
    }
  };

  const customIcon = (url: string) => ({
    url,
    scaledSize: new google.maps.Size(30, 30),
  });

  const getPosition = (lat?: string, lng?: string) => ({
    lat: Number(lat) || defaultMapCenter.lat,
    lng: Number(lng) || defaultMapCenter.lng,
  });

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(function (position) {
      setMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={mapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onClick={handleMapClick} // Add the onClick handler
      >
        <Marker position={mapCenter} />
        {previas?.map((previa, index) => (
          <Marker
            key={`${previa.previa_id}_${index}`}
            position={getPosition(previa?.lat, previa?.lng)}
            icon={customIcon(previa?.images_previa_url?.[0] || '/images/placeholder.jpg')}
            onClick={() => handleMarkerClick(previa)}
          />
        ))}
        {selectedPrevia && (
          <MapInfoWindow
            position={getPosition(selectedPrevia?.lat, selectedPrevia?.lng)}
            onCloseClick={handleInfoWindowCloseClick}
            previa={selectedPrevia}
          />
        )}
        {selectedPoint && (
          <Marker
            position={selectedPoint}
          />
        )}
      </GoogleMap>
    </div>
  );
}
