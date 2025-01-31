import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navbar from './Navbar'
import { useWindowWidth } from '@/contexts/WindowContext';

export default function Header({ authenticated, setAuthenticated }) {
    useAuth(); // Utilizza il contesto dell'autenticazione

    // Response Mobile Width
    const { windowWidth } = useWindowWidth();
    const mobileWidth = windowWidth >= 640

    return (
        <header className={mobileWidth ? "fixed top-0 left-0 right-0 z-50 w-full" : 'w-full'}>
            <div className='mx-w-full mx-auto flex justify-between items-center'>
                <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} />
            </div>
        </header>
    )
}