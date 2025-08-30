"use client"

import Link from "next/link"
import { useState } from "react"
import { PGLogo } from "./ui/pg-logo"

export default function PgHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="nav-apple sticky top-0 z-40" role="banner">
        <div className="container-apple h-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded-lg p-1"
            aria-label="Ottawa Design Atelier - Go to homepage"
          >
            <PGLogo width={24} height={24} aria-hidden="true" />
            <div>
              <span className="font-light text-slate-800 tracking-wide uppercase" style={{ fontSize: "18px" }}>
                Ottawa Design Atelier
              </span>
              <div className="text-xs text-sky-400 font-light tracking-widest uppercase" style={{ fontSize: "10px" }}>
                Master Collection
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className="text-body-s text-slate-800 hover:text-sky-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-1 font-light tracking-wide uppercase"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-body-s text-slate-800 hover:text-sky-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-1 font-light tracking-wide uppercase"
            >
              Collection
            </Link>
            <Link
              href="/custom-walk-in-closets"
              className="text-body-s text-slate-800 hover:text-sky-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-1 font-light tracking-wide uppercase"
            >
              Atelier Services
            </Link>
            <Link
              href="/blog"
              className="text-body-s text-slate-800 hover:text-sky-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-1 font-light tracking-wide uppercase"
            >
              Journal
            </Link>
            <Link
              href="/contact"
              className="text-body-s text-slate-800 hover:text-sky-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-1 font-light tracking-wide uppercase"
            >
              Contact
            </Link>

            <Link
              href="/request-work"
              className="bg-sky-400 text-slate-800 px-6 py-2 font-light tracking-wide uppercase hover:bg-slate-800 hover:text-white transition-all shadow-lg ml-6 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded-lg"
            >
              Consultation
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-pg-navy focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded-lg hover:bg-pg-offwhite transition-colors duration-200"
              aria-label="Open main menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={closeMobileMenu}
          />

          {/* Slide-out menu */}
          <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={closeMobileMenu}
                className="p-2 text-pg-navy hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2"
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Navigation items */}
            <nav className="px-6 py-4" role="navigation" aria-label="Mobile navigation">
              <div className="space-y-6">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="block text-lg font-light text-slate-800 hover:text-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-2 tracking-wide uppercase"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={closeMobileMenu}
                  className="block text-lg font-light text-slate-800 hover:text-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-2 tracking-wide uppercase"
                >
                  Collection
                </Link>
                <Link
                  href="/custom-walk-in-closets"
                  onClick={closeMobileMenu}
                  className="block text-lg font-light text-slate-800 hover:text-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-2 tracking-wide uppercase"
                >
                  Atelier Services
                </Link>
                <Link
                  href="/blog"
                  onClick={closeMobileMenu}
                  className="block text-lg font-light text-slate-800 hover:text-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-2 tracking-wide uppercase"
                >
                  Journal
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="block text-lg font-light text-slate-800 hover:text-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2 rounded px-2 py-2 tracking-wide uppercase"
                >
                  Contact
                </Link>

                {/* CTA Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/request-work"
                    onClick={closeMobileMenu}
                    className="block w-full text-center bg-slate-800 text-white py-3 px-6 rounded-lg font-light tracking-wide uppercase hover:bg-sky-400 hover:text-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pg-sky focus:ring-offset-2"
                  >
                    Consultation
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
