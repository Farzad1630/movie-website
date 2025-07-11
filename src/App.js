import React from 'react';
import './App.css';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Home} from './pages/Home'
import {MovieDetails} from './pages/MovieDetails'
import { Navnav } from './component/navnav';

function App() {

  return (

    <div className="App">
        
        <Router>
          
          <Navnav/>
          
          <div className='container mt-4 '>

          <Routes>

            <Route path='/' element={<Home/>}/>
            <Route path='/movie/:id' element={<MovieDetails />}/>

          </Routes>

          </div>

        </Router>

    </div>

  );
}

export default App;
