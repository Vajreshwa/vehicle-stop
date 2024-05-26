export default function handler(req, res) {
  const gpsData = [
    { timestamp: '2024-05-25T08:00:00Z', latitude: 40.712776, longitude: -74.005974 },
    { timestamp: '2024-05-25T08:05:00Z', latitude: 40.712776, longitude: -74.005974 },
    { timestamp: '2024-05-25T08:10:00Z', latitude: 40.712776, longitude: -74.005974 },
    { timestamp: '2024-05-25T08:15:00Z', latitude: 40.713776, longitude: -74.005974 },
  ];

  res.status(200).json(gpsData);
}