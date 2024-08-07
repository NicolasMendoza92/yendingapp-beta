
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