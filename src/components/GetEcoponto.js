import React, { useState } from 'react';
import '../assets/styles/get-ecoponto.css';
import locations from '../ecopontos.json';
import LocationArrow from '../assets/images/location-arrow.svg';
import RecycleLogo from '../assets/images/recycle.svg';
import Ecoponto from '../assets/images/ecoponto.jpeg';
import Lixo from '../assets/images/lixo.jpg';

const GetEcoponto = () => {
  const [nearestLocation, setNearestLocation] = useState(null);
  const [nearestDistance, setNearestDistance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [buttonText, setButtonText] = useState('Buscar Ecoponto ');
  const [iframeContent, setIframeContent] = useState('');
  const [userPosition, setUserPosition] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY_MAPS;

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
    setLoadingMessage("");
    setNearestLocation(null);
    setNearestDistance(null);
    setErrorMessage(null);
    setIframeContent('');
    setButtonText('Buscando...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        setUserPosition({ lat: userLat, lon: userLon });
        console.log(userPosition);

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
        setButtonText('Buscar Ecoponto');

        const routeUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${userLat},${userLon}&destination=${nearestLoc.name}`;
        const iframe = `<iframe   src="${routeUrl}" allowfullscreen></iframe>`;
        setIframeContent(iframe);
      }, error => {
        setErrorMessage("Não foi possível obter a localização do usuário.");
        setLoadingMessage('');
        setButtonText('Buscar Ecoponto');
      });
    } else {
      setErrorMessage("Geolocalização não é suportada pelo navegador.");
      setLoadingMessage('');
      setButtonText('Buscar Ecoponto');
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
        <button onClick={findNearestLocation}>
          {buttonText === 'Buscando...' && <span className="spinner"></span>}
          {buttonText} 
         
        </button>
        <div className='ecoponto-info'>
          {loadingMessage && <p>
            {loadingMessage}
            <div className='loader'></div>
          </p>}
          {errorMessage && <p>{errorMessage}</p>}
          {nearestLocation && nearestDistance !== null && (
            <div className='ecoponto-details'>
              <p>O Ecoponto mais próximo é: 
                <br></br>
                {nearestLocation.name}.
              </p>
              
              <div dangerouslySetInnerHTML={{ __html: iframeContent }} />
              <button className='open-maps' onClick={openGoogleMaps}>
                Ver no Mapa
                <img src={LocationArrow} alt='Abrir no Google Maps' />
              </button>

              
            </div>
          )}
        </div>
        <div className='ecoponto-text'>
          <div className='ecoponto-text-info'>
            <h3>
              <img src={RecycleLogo} alt='Simbolo de reciclagem' />
              O que é um Ecoponto?
            </h3>
            <p>"Os Ecopontos são pontos de entrega voluntária de pequenos volumes de resíduos recicláveis volumosos, distribuídos por diversos bairros de São Luís e região, estimulando a responsabilidade dos cidadãos com a correta destinação dos resíduos sólidos que produzem em casa ou com pequenas reformas."</p>
            <img src={Ecoponto} alt='Ecoponto' />
          </div>
        </div>
        <div className='ecoponto-text'>
          <div className='ecoponto-text-info'>
            <h3>
              <img src={RecycleLogo} alt='Simbolo de reciclagem' />
              Qual o horário de funcionamento?
            </h3>
            <p>"Os Ecopontos de São Luís e região funcionam de segunda-feira a sábado, das 7h às 19h."</p>
           </div>
        </div>

        <div className='ecoponto-text'>
          <div className='ecoponto-text-info'>
            <h3>
              <img src={RecycleLogo} alt='Simbolo de reciclagem' />
              O que eles podem receber?
            </h3>
            <p>"Os Ecopontos podem receber eletrônicos (televisão, monitores, impressoras, mouses, teclados, etc.), entulho (resíduos de construção civil, como tijolos, telhas, gessos, etc.), madeiras, óleo de cozinha, pneus, poda de árvore, resto de capina e móveis (sofás, colçhões, etc.) ."</p>
            <img src={Lixo} alt='Lixo' />
           </div>
        </div>
        
        

        

      </div>
      
  );
}

export default GetEcoponto;
