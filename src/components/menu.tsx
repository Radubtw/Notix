import React from 'react';
import { Link } from 'react-router-dom';

type Props = {}

function Menu({}: Props) {
  return (
    <div
      style={{
        backgroundImage: `url(/login.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className='h-screen w-screen'
    >
      <div className='h-screen w-screen items-center justify-center flex flex-col space-y-6 text-center'>
        <Link to="/materii">
          <button className='px-24 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85 w-60'>
            Materii
          </button>
        </Link>
        
        <Link to="/orar">
          <button className='px-24 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85 w-60'>
            Orar
          </button>
        </Link>
        
        <Link to="/medii">
          <button className='px-24 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85 w-60'>
            Medii
          </button>
        </Link>
        
        <Link to="/absente">
          <button className='px-20 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85 w-60'>
            Absente
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
