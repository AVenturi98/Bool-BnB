import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from './Navbar'

export default function Header({ authenticated, setAuthenticated }) {
    useAuth(); // Utilizza il contesto dell'autenticazione

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full">
            <div className='mx-w-full mx-auto flex justify-between items-center'>
                <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
            </div>
        </header>
    )
}