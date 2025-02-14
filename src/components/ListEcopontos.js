import React from 'react';
import '../assets/styles/list-ecopontos.css';
import locations from '../ecopontos.json';
import LocationArrow from '../assets/images/location-arrow.svg';

const ListEcopontos = () => {
  const openGoogleMaps = (location) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        
        const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${location.name}`;
        window.open(routeUrl, '_blank');
      }, error => {
        console.log("Não foi possível obter a localização do usuário.");
      });
    } else {
      console.log("Geolocalização não é suportada pelo navegador.");
    }
  };

  return (
    <div className='list-ecopontos'>
      {locations.map(location => (
        <div key={location.id} className='location'>
          <h3>{location.name}</h3>
          <div className='location-details'>
            <h6>Endereço:</h6>
            <p>{location.address}</p>
            <button 
              className='location-get'
              onClick={() => openGoogleMaps(location)}
            >
              Ver no mapa
              <img src={LocationArrow} alt='location-arrow' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListEcopontos;
