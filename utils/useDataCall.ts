'use client';

import { useState } from 'react';

export const useDataCall = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fakeApiCall = async () => {
    setIsLoading(true);
    try {
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.5) {
            resolve('Success');
          } else {
            reject('Error');
          }
        }, 3000);
      });
      return result;
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    fakeApiCall,
  };
};
