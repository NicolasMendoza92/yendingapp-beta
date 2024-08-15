export const dynamic = 'force-dynamic';

import { MapProvider } from '@/lib/MapProvider';
import Map from '@/components/map/Map';
import { Previas } from '@/types/data';

type MapContentProps = {
  previas?: Previas[];
};

export function MapContent({ previas }: MapContentProps) {
  return (
    <MapProvider>
      <main className="flex items-center justify-center p-2">
        <Map previas={previas}/>
      </main>
    </MapProvider>
  );
}
