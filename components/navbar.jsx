import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import Router from 'next/router'

import { getUser, verifyToken } from '../hooks/useLocalStorage'

const links = [
  {
      key: 'product',
      name: 'Product',
      sub: [
        {
          key: 'product_A',
          name: 'Product A',
          link: '/'
        },
        {
          key: 'product_B',
          name: 'Product B',
          link: '/'
        },
        {
          key: 'product_C',
          name: 'Product C',
          link: '/'
        },
      ],
      link: '/'
  },
  {
      key: 'features',
      name: 'Features',
      sub: [
        {
          key: 'features_A',
          name: 'Features A',
          link: '/'
        },
        {
          key: 'features_B',
          name: 'Features B',
          link: '/'
        },
        {
          key: 'features_C',
          name: 'Features C',
          link: '/'
        },
      ],
      link: '/'
  },
  {
      key: 'pricing',
      name: 'Pricing',
      link: '/'
  },
  {
      key: 'resources',
      name: 'Resources',
      link: '/'
  }
];

const Navbar = () => {
  const user = getUser();
  const verifiedtoken = verifyToken();

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
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

        <div className="hidden md:flex flex-shrink flex-grow-0 justify-start px-2 gap-8">
          {links.map((item, i) => (
            <Link key={i} href={item.link} passHref>
              <a className={`text-white text-sm ${(item.sub) ? "is_sub" : ''}`}>{item.name}</a>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center gap-8">
              {
                (!user || !user.ID || !verifiedtoken) ?
                  <>
                    <Link href="login" passHref>
                      <a className="text-white text-sm">Log in</a>
                    </Link>

                    <Link href="signup" passHref>
                      <a className="text-white font-bold text-sm bg-gradient-to-b from-[#4D13C0] to-[#2D0885] px-6 py-3 rounded-md">Sign up</a>
                    </Link>
                  </>
                :
                  <>
                    <Link href="app" passHref>
                      <a className="text-white text-sm">App</a>
                    </Link>
                    <a className="text-white text-sm" onClick={logoutHandler}>Log out</a>
                  </>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
