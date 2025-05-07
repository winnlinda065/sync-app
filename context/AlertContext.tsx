'use client';
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

type AlertContextType = {
  showAlert: boolean;
  toggleAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [showAlert, setShowAlert] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear the timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const toggleAlert = () => {
    setShowAlert(prev => {
      const newState = !prev;

      // If we're opening the alert, set a timer to close it
      if (newState === true) {
        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        // Set new timer to close after 3 seconds
        timerRef.current = setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        // If we're manually closing, clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }

      return newState;
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert, toggleAlert }}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
