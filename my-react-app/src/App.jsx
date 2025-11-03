import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Chapter1 from './pages/Chapter1';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {BrowswerRouter as Router, Route, Switch, Routes} from 'react-router-dom';


function App() {
  

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/'  element={<Home/>} />
          <Route path='/chapter1'  element={<Chapter1/>} />
          <Route path='/profile'  element={<Profile/>} />
          <Route path='/progress'  element={<Progress/>} />
          <Route path='/settings'  element={<Settings/>} />
          <Route path='/signin'  element={<SignIn/>} />
          <Route path='/signup'  element={<SignUp/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
