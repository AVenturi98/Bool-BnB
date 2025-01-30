import React, { createContext, useState, useEffect, useContext } from 'react';

const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <WindowContext.Provider value={{ windowWidth }}>
            {children}
        </WindowContext.Provider>
    );
};

export const useWindowWidth = () => {
    return useContext(WindowContext);
};