"use client"
import type React from "react"
import { AuthProvider } from "@/contexts/AuthContext"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="bg-white text-gray-900">
        {children}
      </div>
    </AuthProvider>
  )
}
