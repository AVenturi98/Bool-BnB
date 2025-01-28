import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from './Navbar'

export default function Header({authenticated,setAuthenticated}) {
    useAuth(); // Utilizza il contesto dell'autenticazione
    
    return (
        <header className="container flex justify-start items-center">
            <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </header>
    )
}