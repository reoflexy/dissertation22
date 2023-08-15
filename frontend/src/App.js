import React from 'react'
import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router';
import Intro from './views/Intro';
import Architecture from './views/Architecture';
import JobList from './views/JobList';
import SimResult from './views/SimResult';

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
    },
    {
      path: '/simresult',
      element: <SimResult/>
    }


  ])
  return routes;
}

export default App;
