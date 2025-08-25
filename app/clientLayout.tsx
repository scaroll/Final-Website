"use client"
import type React from "react"
import { AuthProvider } from "../contexts/AuthContext"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-gray-900">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="PG Closets Logo"
                className="h-8 w-auto mr-3"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  e.currentTarget.nextElementSibling.style.display = "block"
                }}
              />
              <h1 className="text-2xl font-bold" style={{ display: "none" }}>
                PG Closets
              </h1>
              <h1 className="text-2xl font-bold">PG Closets</h1>
            </div>
            <nav className="mt-2">
              <a href="/" className="mr-4 hover:underline">
                Home
              </a>
              <a href="/products" className="mr-4 hover:underline">
                Products
              </a>
              <a href="/about" className="mr-4 hover:underline">
                About
              </a>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 PG Closets. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  )
}
