import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

const Map = ({ gpsData, stoppages }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet/dist/leaflet.css');
    }
  }, []);

  return <DynamicMap gpsData={gpsData} stoppages={stoppages} />;
};

export default Map;
