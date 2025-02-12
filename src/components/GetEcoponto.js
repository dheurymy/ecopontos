import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/get-ecoponto.css';
import locations from '../ecopontos.json';

const GetEcoponto = () => {

    

    // Função para calcular a distância entre duas coordenadas (em km)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    // Função para encontrar a localização mais próxima
    function findNearestLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;

                let nearestLocation = null;
                let nearestDistance = Infinity;

                locations.forEach(location => {
                    const distance = calculateDistance(userLat, userLon, location.lat, location.lon);
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestLocation = location;
                    }
                });

                document.getElementById("output").innerHTML = `O Ecoponto mais próximo é: ${nearestLocation.name}, a ${nearestDistance.toFixed(2)} km de distância.`;
            }, error => {
                document.getElementById("output").innerHTML = "Não foi possível obter a localização do usuário.";
            });
        } else {
            document.getElementById("output").innerHTML = "Geolocalização não é suportada pelo navegador.";
        }
    }

  return (
    <div className='get-ecoponto'>
      <h1>Encontre o Ecoponto<br></br>mais próximo de você:</h1>
      <button onClick={findNearestLocation}>Buscar Ecoponto</button>
      <div className='ecoponto-info'>
        <p id="output"></p>

      </div>
      <Link to="/list"><button>Lista de Ecopontos</button></Link>
    </div>
  )
}

export default GetEcoponto
