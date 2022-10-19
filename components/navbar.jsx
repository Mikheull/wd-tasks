import React from "react";
import Link from "next/link";
import Router from 'next/router'
import toast from 'react-hot-toast';
import { LogOut } from 'react-feather';

import { getUser, verifyToken } from '../hooks/useLocalStorage'

const links = [
  {
      key: 'product',
      name: 'Product',
      sub: [
        {
          key: 'product_A',
          name: 'Product A',
          link: '#'
        },
        {
          key: 'product_B',
          name: 'Product B',
          link: '#'
        },
        {
          key: 'product_C',
          name: 'Product C',
          link: '#'
        },
      ],
      link: '#'
  },
  {
      key: 'features',
      name: 'Features',
      sub: [
        {
          key: 'features_A',
          name: 'Features A',
          link: '#'
        },
        {
          key: 'features_B',
          name: 'Features B',
          link: '#'
        },
        {
          key: 'features_C',
          name: 'Features C',
          link: '#'
        },
      ],
      link: '#'
  },
  {
      key: 'pricing',
      name: 'Pricing',
      link: '#'
  },
  {
      key: 'resources',
      name: 'Resources',
      link: '#'
  }
];

const Navbar = () => {
  const user = getUser();
  const verifiedtoken = verifyToken();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Successfully disconnected', {
      duration: 2000,
      position: 'top-center',
    });
    Router.push('/login')
  }

  return (
    <>
      <nav className="max-w-7xl md:px-4 flex relative justify-between items-center mx-auto h-24 z-10">
        <div className="inline-flex">
          <Link href="/" passHref>
            <a>
              <img
                src="/images/logo/logo_white.svg"
                className="cursor-pointer h-10"
                alt="Logo"
              />
            </a>
          </Link>
        </div>

        <div className="hidden md:flex flex-shrink flex-grow-0 justify-start px-2 gap-12">
          {links.map((item, i) => (
            <Link key={i} href={item.link} passHref>
              <a className={`text-white text-md ${(item.sub) ? "is_sub" : ''}`}>{item.name}</a>
            </Link>
          ))}
        </div>

        <div className="flex flex-initial">
          <div className="flex justify-end items-center relative">
            {
              (!user || !user.ID || !verifiedtoken) ?
                <div className="flex mr-4 items-center gap-8">
                  <Link href="login" passHref>
                    <a className="text-white text-sm">Log in</a>
                  </Link>

                  <Link href="signup" passHref>
                    <a className="tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 font-bold text-sm px-4 py-2">Sign up</a>
                  </Link>
                </div>
              :
                <div className="flex mr-4 items-center gap-4">
                  <Link href="app" passHref>
                    <a className="text-white text-sm">App</a>
                  </Link>
                  <Link href="profile" passHref>
                    <a className="text-white text-sm flex items-center gap-2">
                      Profile
                      <img className="h-6 w-6 rounded-full" src={user.attachmentUrl ? user.attachmentUrl : '../images/avatar.jpg'}/>
                    </a>
                  </Link>
                  <a className="text-white text-sm cursor-pointer" onClick={logoutHandler}><LogOut height={16} /></a>
                </div>
            }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
