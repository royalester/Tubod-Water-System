const API_BASE = 'http://<your-ip>:3001/api'; // use LAN IP if using real phone

export const getReadings = async () => {
  const res = await fetch(`${API_BASE}/readings`);
  return res.json();
};

export const getHouseholds = async () => {
  const res = await fetch(`${API_BASE}/households`);
  return res.json();
};
