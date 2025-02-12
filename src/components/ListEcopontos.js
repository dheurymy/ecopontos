import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/list-ecopontos.css';
import locations from '../ecopontos.json';

const ListEcopontos = () => {
  return (
    <div className='list-ecopontos'>
        <h1>Lista de Ecopontos</h1>

        <Link to="/"><button>Buscar Ecopontos</button></Link>

        {locations.map(location => (
          <div  className='location'>
            <h3>{location.name}</h3>
            
                <p><strong>Endereço:</strong> {location.address}</p>
                
            
          </div>
        ))}
      
      
    </div>
  )
}

export default ListEcopontos
