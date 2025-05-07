'use client';
import { AnimatePresence, motion } from 'motion/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { FaChartLine, FaChevronLeft, FaDollarSign, FaRegBell } from 'react-icons/fa';
import { FaChartLine as FaChartLine6 } from 'react-icons/fa6';

import Link from 'next/link';
import { IoClose, IoWalletOutline } from 'react-icons/io5';
import { useAlert } from '../context/AlertContext';
import LedgerIcon from './LedgerIcon';
import Main from './Main';
import ManagerIcon from './ManagerIcon';
import RecieveIcon from './RecieveIcon';
import SendIcon from './SendIcon';
import SwapIcon from './SwapIcon';

const AppLayout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const { showAlert, toggleAlert } = useAlert();

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const isTabletOrSmaller = window.innerWidth < 768;
      setIsMobile(isTabletOrSmaller);
      if (isTabletOrSmaller) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navItem = [
    {
      title: 'Portfolio',
      icon: <FaChartLine6 />,
    },
    {
      title: 'Market',
      icon: <FaChartLine />,
    },
    {
      title: 'Accounts',
      icon: <IoWalletOutline />,
    },
    {
      title: 'Send',
      icon: <SendIcon />,
    },
    {
      title: 'Receive',
      icon: <RecieveIcon />,
    },
    {
      title: 'Buy/Sell',
      icon: <FaDollarSign />,
    },
    {
      title: 'Swap',
      icon: <SwapIcon />,
    },
    {
      title: 'Manager',
      icon: <ManagerIcon />,
    },
  ];
  return (
    <div className="relative flex h-screen overflow-hidden">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="bg-alert-box relative flex flex-col items-center gap-y-2 rounded-md p-4">
              <IoClose
                size={22}
                className="absolute top-0 left-0 cursor-pointer"
                onClick={toggleAlert}
              />
              <FaRegBell size={18} />
              <p>
                Connect <b>Ledger</b> to continue
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sidebar */}

      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            layout
            initial={{ width: 0 }}
            animate={{ width: 285 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: isMobile ? 'absolute' : 'relative',
            }}
            className={`bg-gray z-[9] h-full shadow-sm`}
          >
            <div className="relative flex h-full flex-col p-4">
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="absolute top-28 -right-4 flex size-8 items-center justify-center rounded-full border-2 border-white"
                >
                  <FaChevronLeft />
                </button>
              )}
              <Link href={'/'} className="cursor-pointer" role="button">
                <div className="mx-7 mb-6 font-bold">
                  <LedgerIcon />
                </div>
              </Link>
              <ul className="flex-1 space-y-5">
                {navItem.map((item, index) => (
                  <li
                    key={index}
                    onClick={toggleAlert}
                    className="text-gray-text cursor-pointer rounded pl-6"
                  >
                    <p className="flex items-center space-x-6">
                      <span className="size-4">{item.icon}</span>
                      <span className="text-gray-text hover:è font-medium">{item.title}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isMobile && (
          <motion.div
            key="sidebar"
            layout
            initial={{ width: 285 }}
            animate={{ width: 285 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-gray h-full shadow-sm`}
          >
            <div className="relative flex h-full flex-col p-4">
              <Link href={'/'} className="cursor-pointer" role="button">
                <div className="mx-7 mb-6 font-bold">
                  <LedgerIcon />
                </div>
              </Link>
              <ul className="flex-1 space-y-5">
                {navItem.map((item, index) => (
                  <li
                    key={index}
                    onClick={toggleAlert}
                    className="text-gray-text cursor-pointer rounded pl-6"
                  >
                    <p className="flex items-center space-x-6">
                      <span className="size-4">{item.icon}</span>
                      <span className="text-gray-text hover:è font-medium">{item.title}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        layout
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-1 overflow-auto px-5 py-3 sm:px-8 md:px-10 lg:px-12"
      >
        <Main toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        {children}
      </motion.div>
      {/* Main Content */}
    </div>
  );
};

export default AppLayout;
