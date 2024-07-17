
import './globals.css'
import { AuthProvider } from '@/context/Providers';
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: 'PreviApp ',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div>
            <Toaster position="bottom-center" />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}