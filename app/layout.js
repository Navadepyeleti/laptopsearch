'use client';

import './globals.css'
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
