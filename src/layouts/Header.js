import React, { useState, useContext, useEffect } from 'react';
import { ClientContext } from '../contexts/ClientContext';

const Header = () => {

  const { siteData } = useContext(ClientContext);
  const [nav, setNav] = useState([]);
  const [social, setSocial] = useState([]);

  useEffect(() => {
      if (siteData) {
          setNav(JSON.parse(siteData.main_navigation))
      }
  }, [])

  return (
    <header className="bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b  lg:border-none">
          <div className="flex items-center">
            <a href="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=black"
                alt=""
              />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
            <a key="home" href="/"  className="text-base font-medium text-gray-700 hover:text-gray-400">
                  Home
              </a>
              <a key="articles" href="/postlist"  className="text-base font-medium text-gray-700 hover:text-gray-400">
                  Articles
              </a>
              {nav.map((link) => (
                <a key={link.label} href={`/posts/${link.uri}`}  className="text-base font-medium text-gray-700 hover:text-gray-400">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
           <a
              href="/login"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </a>
             {/* 
            <a
              href="#"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Sign up
            </a> */}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <a key="home" href="/"  className="text-base font-medium text-gray-700 hover:text-gray-400">
                  Home
              </a>
              <a key="articles" href="/postlist"  className="text-base font-medium text-gray-700 hover:text-gray-400">
                  Articles
              </a>
          {nav.map((link) => (
            <a key={link.label} href={link.uri} className="text-base font-medium text-white hover:text-gray-400">
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header;