import React from 'react';
import { Pin, Rocket } from 'lucide-react';

/**
 * Navbar Component
 * 
 * Renders the global fixed top header navigation menu.
 * Links are designed as playful floating sticky notes that scale and rotate on hover.
 * Includes a CTA button to navigate to the SignIn screen.
 * 
 * @param {object} props
 * @param {function} props.onGetStarted - Callback triggered when clicking the "Get Started" CTA button.
 */
export default function Navbar({ onGetStarted }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--nav-bg)] text-[var(--text-color)] backdrop-blur-md transition-colors duration-150">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

                {/* Brand Logo & Name */}
                <div className="flex items-center gap-10">
                    <img
                        src="/visionate logo.png"
                        alt="Visionate Logo"
                        className="relative flex flex-col items-center justify-center w-16 h-16 rotate-[-2deg] hover:rotate-[3deg] active:scale-95 transition-all duration-300 select-none text-amber-955 font-handwriting"
                    />
                    <span className="text-2xl tracking-tight text-[var(--text-color)] capitalize">Vnotes</span>
                </div>

                {/* Navigation Links (Hidden on mobile viewports) */}
                <nav className="hidden items-center gap-10 text-base font-medium md:flex">
                    {/* Home Link: styled as a yellow sticky note */}
                    <a
                        href="#home"
                        style={{ backgroundColor: '#fef08a' }}
                        className="relative flex flex-col items-center justify-center w-30 h-16 shadow-md hover:rotate-[3deg] hover:scale-110 active:scale-95 transition-all duration-300 select-none text-amber-955 font-handwriting border border-black/5"
                    >
                        <span className="text-2xl mt-2 capitalize">Home</span>
                    </a>

                    {/* Product Link: styled as a cyan sticky note */}
                    <a
                        href="#product"
                        style={{ backgroundColor: '#cffafe' }}
                        className="relative flex flex-col items-center justify-center w-30 h-16 shadow-md hover:rotate-[-2deg] hover:scale-110 active:scale-95 transition-all duration-300 select-none text-cyan-950 font-handwriting border border-black/5"
                    >
                        <span className="text-2xl mt-2 capitalize">Product</span>
                    </a>

                    {/* About Link: styled as an emerald sticky note */}
                    <a
                        href="#about"
                        style={{ backgroundColor: '#bbf7d0' }}
                        className="relative flex flex-col items-center justify-center w-30 h-16 shadow-md hover:rotate-[1deg] hover:scale-110 active:scale-95 transition-all duration-300 select-none text-emerald-955 font-handwriting border border-black/5"
                    >
                        <span className="text-2xl mt-2 capitalize">About</span>
                    </a>

                    {/* Contact Link: styled as a rose sticky note */}
                    <a
                        href="#contact"
                        style={{ backgroundColor: '#fecdd3' }}
                        className="relative flex flex-col items-center justify-center w-30 h-16 shadow-md hover:rotate-[-3deg] hover:scale-110 active:scale-95 transition-all duration-300 select-none text-rose-950 font-handwriting border border-black/5"
                    >
                        <span className="text-2xl mt-2 capitalize">Contact</span>
                    </a>
                </nav>

                {/* Call To Action button (triggers SignIn page overlay) */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onGetStarted}
                        style={{ backgroundColor: '#e0e7ff' }}
                        className="relative flex flex-col items-center justify-center px-4 py-2 h-16 shadow-md hover:rotate-[3deg] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer select-none text-indigo-950 font-handwriting border border-black/5"
                    >
                        {/* Bouncing rocket decoration atop the note */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2">
                            <Rocket className="h-3 w-3 fill-red-500 text-red-600 drop-shadow-sm rotate-35" />
                        </div>
                        <span className="text-2xl mt-2 capitalize">Get Started</span>
                    </button>
                </div>

            </div>
        </header>
    );
}
