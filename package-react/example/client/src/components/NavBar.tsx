import React from 'react';
import { NavLink } from 'react-router-dom';
import ToggleThemeButton from './ToggleThemeButton';

export default function NavBar() {
  const setActiveClass = ({ isActive }) =>
    isActive
      ? 'block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent'
      : 'block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';

  return (
    <nav className="border-gray-200 dark:bg-gray-800 dark:border-gray-700 border-b-1 border-gray-300 shadow dark:shadow-dark-custom w-full bg-gray-50">
      <div className="max-w-screen-lg flex items-center justify-between mx-auto ml-4">
        <a href="#" className="flex items-center space-x-4 rtl:space-x-reverse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-blue-700"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DiscussDock
          </span>
        </a>

        {/* Right */}
        <div
          className="flex items-center justify-end p-4 space-x-8"
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <NavLink
                to="/technology-discussion"
                className={setActiveClass}
                // className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
              >
                Technology
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/finance-discussion"
                className={setActiveClass}
                // className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Finance
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sports-discussion"
                className={setActiveClass}
                // className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Sports
              </NavLink>
            </li>
          </ul>

          {/* Divider */}
          <span className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></span>

          <ToggleThemeButton />
        </div>
      </div>
    </nav>
  );
}
