// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Sprawdź stan logowania
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('https://bike.local/api/isLoggedIn', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        setIsLoggedIn(data.logged_in);
      } catch (error) {
        console.error("Błąd sprawdzania logowania:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
