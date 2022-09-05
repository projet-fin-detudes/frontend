import React from 'react';
import AppLogo from './components/AppLogo';
import Results from './components/Results';
import SearchBar from './components/SearchBar';
import logo from './logo.svg';

function App() {
  return (
    <div className='flex flex-col  h-screen  items-center'>  
    <AppLogo/>
    <SearchBar/>
    <Results/>
    </div>   
  );
}

export default App;
