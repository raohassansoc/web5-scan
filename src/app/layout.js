"use client"
import './globals.css'
import { Inter } from 'next/font/google'

import { usePathname } from 'next/navigation';

import axios from 'axios';
import Header from './components/Header/page'
import Footer from './components/Footer/page'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Check if the current route is a login route
  const isLoginRoute = pathname === '/login';
  // console.log(pathname);
  // Conditionally render the header and footer based on the route
  const renderHeader = !isLoginRoute && <Header />;
  const renderFooter = !isLoginRoute && <Footer />;
  
  return (
    <html className="dark" lang="en">
      <head>
      <title>SOC Scan</title>
      <link rel="icon" href="/src/app/favicon.ico" />
      </head>
      <body className={inter.className}>

        {renderHeader}
        {children}
        {renderFooter}

      </body>
    </html>
  )
}
