import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
