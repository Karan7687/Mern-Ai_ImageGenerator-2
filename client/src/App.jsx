import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-[#990000] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        {/* OPEN AI logo with link to Homepage */}
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28 object-contain bg-white rounded p-1.5' />
        </Link>
        {/* Create button with link to Create-Post page */}
        <Link to='create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:scale-125 transition duration-500 ease-in-out'>
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#D3D3D3] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App