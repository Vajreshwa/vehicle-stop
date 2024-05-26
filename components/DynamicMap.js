import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const DynamicMap = ({ gpsData, stoppages }) => {
  const path = gpsData.map(point => [point.latitude, point.longitude]);

  return (
    <MapContainer center={[gpsData[0].latitude, gpsData[0].longitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={path} color="blue" />
      {stoppages.map((stoppage, index) => (
        <Marker key={index} position={[stoppage.location.latitude, stoppage.location.longitude]}>
          <Popup>
            <div>
              <p><strong>Reach Time:</strong> {stoppage.startTime}</p>
              <p><strong>End Time:</strong> {stoppage.endTime}</p>
              <p><strong>Duration:</strong> {stoppage.duration} minutes</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DynamicMap;
