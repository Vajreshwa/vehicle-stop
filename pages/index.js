import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { detectStoppages } from '../utils/stoppageDetection';

// Dynamic import for the Map component
const Map = dynamic(() => import('../components/Map'), { ssr: false });

const Home = () => {
  const [gpsData, setGpsData] = useState([]);
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(5); // Default threshold in minutes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/gps-data');
        const data = response.data;
        setGpsData(data);
        const detectedStoppages = detectStoppages(data, threshold);
        setStoppages(detectedStoppages);
      } catch (error) {
        console.error('Error fetching GPS data:', error);
      }
    };

    fetchData();
  }, [threshold]);

  const handleThresholdChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setThreshold(value);
    }
  };

  return (
    <div>
      <h1>Vehicle Stoppage Identification and Visualization</h1>
      <label>
        Stoppage Threshold (minutes):
        <input
          type="number"
          value={threshold}
          onChange={handleThresholdChange}
        />
      </label>
      {gpsData.length > 0 && <Map gpsData={gpsData} stoppages={stoppages} />}
    </div>
  );
};

export default Home;
