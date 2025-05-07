'use client';
import { useAlert } from '@/context/AlertContext';
import { usePathname } from 'next/navigation';
import { FaBell, FaEye, FaLock, FaQuestionCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiSettings5Fill } from 'react-icons/ri';
import { RxDividerVertical } from 'react-icons/rx';

interface MainProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}
const Main = ({ toggleSidebar }: MainProps) => {
  const path = usePathname();
  const { toggleAlert } = useAlert();

  return (
    <div className="bg-dark-gray">
      {/* Header */}
      <div className="flex items-center">
        <div className="flex-1">
          <header className="flex w-full justify-between md:justify-end">
            <GiHamburgerMenu onClick={toggleSidebar} className="text-gray-text md:hidden" />
            <div className="text-gray-text flex gap-x-1 sm:gap-x-2 md:gap-x-4">
              <RxDividerVertical />
              <FaBell className="cursor-pointer" onClick={toggleAlert} />
              <RxDividerVertical />
              <FaEye className="cursor-pointer" onClick={toggleAlert} />
              <RxDividerVertical />
              <FaQuestionCircle className="cursor-pointer" onClick={toggleAlert} />
              <RxDividerVertical />
              <FaLock className="cursor-pointer" onClick={toggleAlert} />
              <RxDividerVertical />
              <RiSettings5Fill className="cursor-pointer" onClick={toggleAlert} />
            </div>
          </header>
          <div className={`space-y-3 max-md:mt-5`}>
            <h1 className="text-3xl font-semibold">
              {path.includes('recovery') ? 'Restore Your Ledger Wallet' : 'Device initialization'}
            </h1>
            <p className="text-gray-text">
              Manage assets in Live securely from your browser. Advanced security for assets, made
              easy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
