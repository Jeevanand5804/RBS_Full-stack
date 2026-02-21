import React, { createContext, useContext, useState,useEffect } from 'react';

const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  const setEmailValue = (newEmail) => {
    setEmail(newEmail);
      // Save the email to localStorage when it changes
      localStorage.setItem('email', newEmail);
  };
  useEffect(() => {
    // Retrieve the email from localStorage when the component mounts
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <EmailContext.Provider value={{ email, setEmail: setEmailValue }}>
      {children}
    </EmailContext.Provider>
  );
};