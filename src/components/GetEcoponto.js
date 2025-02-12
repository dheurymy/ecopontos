import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/get-ecoponto.css';
import locations from '../ecopontos.json';

const GetEcoponto = () => {
  const [nearestLocation, setNearestLocation] = useState(null);
  const [nearestDistance, setNearestDistance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        let nearestLoc = null;
        let nearestDist = Infinity;

        locations.forEach(location => {
          const distance = calculateDistance(userLat, userLon, location.lat, location.lon);
          if (distance < nearestDist) {
            nearestDist = distance;
            nearestLoc = location;
          }
        });

        setNearestLocation(nearestLoc);
        setNearestDistance(nearestDist);
      }, error => {
        setErrorMessage("Não foi possível obter a localização do usuário.");
      });
    } else {
      setErrorMessage("Geolocalização não é suportada pelo navegador.");
    }
  }, []);

  return (
    <div className='get-ecoponto'>
      <h1>Encontre o Ecoponto<br />mais próximo de você:</h1>
      <button onClick={() => { /* Força o efeito */ }}>Buscar Ecoponto</button>
      <div className='ecoponto-info'>
        {errorMessage && <p>{errorMessage}</p>}
        {nearestLocation && nearestDistance !== null && (
          <p>O Ecoponto mais próximo é: {nearestLocation.name}, a {nearestDistance.toFixed(2)} km de distância.</p>
        )}
      </div>
      <Link to="/list"><button>Lista de Ecopontos</button></Link>
    </div>
  );
}

export default GetEcoponto;
