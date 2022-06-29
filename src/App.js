import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';
import  {GlobalStyle} from './components/GlobalStyles.js';
import { BrowserRouter, Routes, Route, useRoutes} from "react-router-dom";
import Game from './components/Game.js';



function App() {
  return (
    <div className="App">
    	<GlobalStyle/>
    	<Home/>  	
    </div>
  );
}

export default App;
