import React from 'react'
import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router';
import Intro from './views/Intro';
import Architecture from './views/Architecture';
import JobList from './views/JobList';

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Intro/>
    },
    {
      path: '/architecture',
      element: <Architecture/>
    },
    {
      path: '/joblist',
      element: <JobList/>
    }


  ])
  return routes;
}

export default App;
