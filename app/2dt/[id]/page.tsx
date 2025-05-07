'use client';
import { generateUUID } from '@/utils/generateFakeUuid';
import { useDataCall } from '@/utils/useDataCall';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaDownload, FaSync } from 'react-icons/fa';
import { MdOutlineWarningAmber } from 'react-icons/md';

const DetailsPage = () => {
  const { fakeApiCall, isLoading } = useDataCall();

  useEffect(() => {
    fakeApiCall();
  }, []);

  const handleRetry = () => {
    fakeApiCall();
  };

  return (
    <div className="bg-gray mt-5 space-y-10 rounded-xl p-3 py-20 sm:px-5">
      <h1 className="text-center text-3xl">Genuine Check</h1>
      {isLoading ? (
        <div>
          <div className="mx-auto flex justify-center">
            <div className="relative h-[100px] w-[350px]">
              <Image src="/checkimage.png" alt="checkimage" fill className="object-contain" />
            </div>
          </div>
          <p className="mt-4 text-center">Connect and unlock your device</p>
          <div className="mt-10 flex w-full justify-center">
            <span className="loader"></span>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[318px]">
          <MdOutlineWarningAmber className="text-red mx-auto" size={50} />
          <h5 className="text-red cursor-pointer px-4 text-center text-xl">
            Genuine Check Unsuccessful Refresh
          </h5>
          <Link href={`/2dt/${generateUUID()}/recovery`} className="block w-full cursor-pointer">
            <button className="bg-purple mt-5 flex w-full cursor-pointer items-center gap-x-3 rounded-xl px-3 py-2 text-sm font-bold text-white sm:gap-x-5 sm:px-4 sm:text-base">
              <FaDownload className="flex-shrink-0" />
              <p className="flex-1">Restore your wallet from Recovery Phrase</p>
            </button>
          </Link>
          <button
            className="bg-box mt-3 flex w-full cursor-pointer items-center gap-x-3 rounded-xl p-3 px-3 py-4 font-bold text-white sm:gap-x-5 sm:p-4 sm:py-5"
            onClick={handleRetry}
            disabled={isLoading}
          >
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                <FaSync className={`flex-shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
                <p className="">Retry</p>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
