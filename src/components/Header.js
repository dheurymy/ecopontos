import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/header.css';
import HeaderImage from '../assets/images/header-image.svg';
import RecycleLogo from '../assets/images/recycle.svg';

const Header = () => {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setSelectedLink("home");
    } else if (path === "/list") {
      setSelectedLink("list");
    }
  }, [location.pathname]);

  function addSelect(link) {
    setSelectedLink(link);
  }

  return (
    <div className='header'>
      <img src={HeaderImage} alt='Leva Pro Ecoponto'  />
      <nav>
        <Link 
          to="/" 
          className={`header-navigator ${selectedLink === 'home' ? 'selected' : ''}`} 
          onClick={() => addSelect('home')}>
            <img src={RecycleLogo} alt='Simbolo de reciclagem' />
            <p>
              ECOPONTO
              <br></br>
              + PRÓXIMO
            </p>
        </Link>
        <Link 
          to="/list" 
          className={`header-navigator ${selectedLink === 'list' ? 'selected' : ''}`} 
          onClick={() => addSelect('list')}>
          <img src={RecycleLogo} alt='Simbolo de reciclagem' />
          <p>
              TODOS OS
              <br></br>
              ECOPONTOS
          </p>
        </Link>
      </nav>
    </div>
  )
}

export default Header;
