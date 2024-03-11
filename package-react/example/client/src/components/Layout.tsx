import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-white dark:bg-gray-900">
      <NavBar />
      <Outlet />
    </div>
  );
}
