import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define custom icons for each location
const icons = {
  techBuilding: new L.Icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=QxLxNoHewnn7&format=png&color=000000', // Tech Building icon
    iconSize: [30, 30],
  }),
  secondLocation: new L.Icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=80563&format=png&color=000000', // Second location icon
    iconSize: [40, 40],
  }),
  Administration: new L.Icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=pdKhKfJIXNJy&format=png&color=000000', // Second location icon
    iconSize: [40, 40],
  }),
  Barrier: new L.Icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=BKlQdLb7ys7l&format=png&color=000000', // Second location icon
    iconSize: [40, 40],
  }),
};

const VotingLocations = () => {
  const locations = [
    {
      name: 'Voting Place at Tech Building',
      address: 'NSBM Faculty 01',
      hours: '8:30 AM - 3:30 PM',
      coordinates: { lat: 6.820053012265454, lng: 80.03927965057252 },
      iconType: 'techBuilding',
    },
    {
      name: 'Second Location',
      address: 'Another Faculty Building',
      hours: '9:00 AM - 5:00 PM',
      coordinates: { lat: 6.820795561711614, lng: 80.04027680357258 },
      iconType: 'secondLocation',
    },
    {
      name: 'Voter Registration Center',
      address: 'NSBM Administration Building',
      hours: '9:00 AM - 5:00 PM',
      coordinates: { lat: 6.821051650697727, lng: 80.03959053744582 },
      iconType: 'Administration',
    },
    {
      name: 'Stop',
      address: '',
      hours: '9:00 AM - 5:00 PM',
      coordinates: { lat: 6.820406900526883, lng: 80.04005471189247 },
      iconType: 'Barrier',
    },
    {
      name: 'Stop',
      address: '',
      hours: '9:00 AM - 5:00 PM',
      coordinates: { lat: 6.821321129456352, lng: 80.04023206864258 },
      iconType: 'Barrier',
    },
  ];

  return (
    <div className="voting-locations-container">
      {/* Back Button */}
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => window.history.back()} // Go back to the previous page
      >
        ← Back
      </button>
      
      <h1 className="voting-locations-header">📍 Voting Locations</h1>
      <p className="voting-locations-description">
        Find out where you can cast your vote in the university election.
      </p>

      <MapContainer
        center={[locations[0].coordinates.lat, locations[0].coordinates.lng]}
        zoom={13}
        style={{ height: '600px', width: '1100px' }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />


        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={icons[location.iconType]} // Assign icon dynamically based on `iconType`
          >
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.address}
              <br />
              Hours: {location.hours}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VotingLocations;
