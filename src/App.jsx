import { useState } from 'react'
import {Route,Routes,HashRouter} from "react-router-dom"
import Home from './pages/Home'
import UserDetails from './pages/UserDetails'
import Users from './pages/Users'
import "./styles/App.css"

function App() {
  return (
    <div className="Users">
    
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/:users" element={<UserDetails/>}/>
      </Routes>
    </HashRouter>

    </div>
  )
}

export default App
