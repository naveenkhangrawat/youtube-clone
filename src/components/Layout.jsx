import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';
import LeftNav from './LeftNav';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout;

