import React from 'react';
import '../assets/styles/header.css';
import HeaderImage from '../assets/images/header-image.svg'

const Header = () => {
  return (
    <div className='header'>
      <img src={HeaderImage} alt='Header image with Leva Pro Ecoponto'  />

    </div>
  )
}

export default Header
