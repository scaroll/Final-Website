"use client"
import Script from "next/script"
import Head from "next/head"
import { useEffect, useState } from "react"

/**
 * Contact page shows ONLY:
 * - Jobber embedded Work Request form
 * - Public email spencer@peoplesgrp.com as a fallback link
 * No address or phone rendered anywhere.
 * Jobber docs: embed request form in your website. (We load one CSS + one JS and render the div container.)
 */
export default function Contact() {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)

  useEffect(() => {
    const checkJobberForm = setTimeout(() => {
      const jobberContainer = document.getElementById("83a3d24e-c18d-441c-80d1-d85419ea28ae")
      if (jobberContainer && jobberContainer.children.length === 0) {
        console.log("[v0] Jobber form container is empty, script may have failed")
        setScriptError(true)
      }
    }, 5000)

    return () => clearTimeout(checkJobberForm)
  }, [])

  const handleScriptLoad = () => {
    console.log("[v0] Jobber script loaded successfully")
    setScriptLoaded(true)
    setScriptError(false)
  }

  const handleScriptError = () => {
    console.log("[v0] Jobber script failed to load")
    setScriptError(true)
    setScriptLoaded(false)
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"
          media="screen"
        />
      </Head>

      <main className="max-w-[1200px] mx-auto px-6 py-24">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">Request Work</h1>
        <p className="mt-2 text-slate-600">
          Use the form below to tell us about your project. Prefer email?{" "}
          <a className="underline text-blue-600 hover:text-blue-800" href="mailto:spencer@peoplesgrp.com">
            spencer@peoplesgrp.com
          </a>
        </p>

        {/* Jobber embed container */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div id="83a3d24e-c18d-441c-80d1-d85419ea28ae">
            {!scriptLoaded && !scriptError && (
              <div className="flex items-center justify-center py-12">
                <div className="text-slate-500">Loading contact form...</div>
              </div>
            )}
            {scriptError && (
              <div className="py-12 text-center">
                <div className="text-slate-600 mb-4">Unable to load the contact form. Please email us directly:</div>
                <a
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  href="mailto:spencer@peoplesgrp.com?subject=Work Request"
                >
                  Email spencer@peoplesgrp.com
                </a>
              </div>
            )}
          </div>
        </div>

        <Script
          src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
          data-clienthub-id="83a3d24e-c18d-441c-80d1-d85419ea28ae"
          data-form-url="https://clienthub.getjobber.com/client_hubs/83a3d24e-c18d-441c-80d1-d85419ea28ae/public/work_request/embedded_work_request_form"
        />
      </main>
    </>
  )
}
