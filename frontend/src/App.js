import React from 'react'
import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router';
import Intro from './views/Intro';

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Intro/>
    },


  ])
  return routes;
}

export default App;
