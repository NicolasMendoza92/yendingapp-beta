
'use client'
import './globals.css'
import { AuthProvider } from '@/context/Providers';
import { ReactNode } from 'react';
import { Toaster } from "react-hot-toast";
import { ViewTransitions } from 'next-view-transitions'


/* export const metadata = {
  title: 'PreviApp ',
  description: 'Generated by create next app',
} */

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }:RootLayoutProps) => {
  return (
    <ViewTransitions>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>
        <AuthProvider>
          <div>
            <Toaster position="bottom-right" />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
    </ViewTransitions>

  )
}


export default RootLayout;