import React, { useState } from 'react';

import '../assets/styles/get-ecoponto.css';
import locations from '../ecopontos.json';

const GetEcoponto = () => {
  const [nearestLocation, setNearestLocation] = useState(null);
  const [nearestDistance, setNearestDistance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [iframeContent, setIframeContent] = useState('');
  const [userPosition, setUserPosition] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY_MAPS; // Use a variável de ambiente

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const findNearestLocation = () => {
    setLoadingMessage("Buscando o Ecoponto mais próximo...");
    setNearestLocation(null);
    setNearestDistance(null);
    setErrorMessage(null);
    setIframeContent('');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        setUserPosition({ lat: userLat, lon: userLon });

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
        setLoadingMessage('');

        // Gerar a rota e incorporar no iframe usando o nome do local
        const routeUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${userLat},${userLon}&destination=${nearestLoc.name}`;
        const iframe = `<iframe  frameborder="0" style="border:0" src="${routeUrl}" allowfullscreen></iframe>`;
        setIframeContent(iframe);
      }, error => {
        setErrorMessage("Não foi possível obter a localização do usuário.");
        setLoadingMessage('');
      });
    } else {
      setErrorMessage("Geolocalização não é suportada pelo navegador.");
      setLoadingMessage('');
    }
  };

  const openGoogleMaps = () => {
    if (nearestLocation && userPosition) {
      const { lat: userLat, lon: userLon } = userPosition;
      const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${nearestLocation.name}`;
      window.open(routeUrl, '_blank');
    }
  };

  return (
    <div className='get-ecoponto'>
      <h1>Encontre o Ecoponto<br />mais próximo de você:</h1>
      <button onClick={findNearestLocation}>Buscar Ecoponto</button>
      <div className='ecoponto-info'>
        {loadingMessage && <p>
          {loadingMessage}
          <div className='loader'></div>
        </p>}
        {errorMessage && <p>{errorMessage}</p>}
        {nearestLocation && nearestDistance !== null && (
          <div className='ecoponto-details'>
            <p>O Ecoponto mais próximo é: {nearestLocation.name}, a {nearestDistance.toFixed(2)} km de distância.</p>
            
            <div dangerouslySetInnerHTML={{ __html: iframeContent }} />
            <button className='open-maps' onClick={openGoogleMaps}>Abrir no Google Maps</button>
          </div>
        )}
      </div>

    </div>
  );
}

export default GetEcoponto;

