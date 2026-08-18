import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {

    const handleScrollDown = () => {
        const subHero = document.getElementById('sub-hero');
        if (!subHero) return;

        const targetY = subHero.getBoundingClientRect().top + window.pageYOffset;
        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const difference = targetY - startY;
        const duration = 1800; // Duration in ms (1.8 seconds) for slow scrolling
        let startTime = null;

        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startY, difference, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    };

    return (
        <section id="home" className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden px-6 pb-16 pt-24 " >
            <style>{`
                @keyframes slow-bounce {
                    0%, 100% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(-8px);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                .animate-slow-bounce {
                    animation: slow-bounce 3s infinite;
                }
            `}</style>

            <div className="relative z-10 mx-auto max-w-5xl text-center flex-1 flex flex-col justify-center items-center">
                {/* Brand Logo */}
                <img
                    src="/visionate logo.png"
                    alt="Visionate Logo"
                    className="h-60 w-auto -mt-25 object-contain"
                />

                {/* Main Heading / Value Prop */}
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
                    <span className="block mb-1">Your thoughts, organized.</span>
                    <span className="text-indigo-600 block">Searchable at the speed of thought.</span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-600 sm:text-lg">
                    A modern sticky-notes platform
                </p>
            </div>

            {/* Floating Down Arrow */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
                <button
                    type="button"
                    onClick={handleScrollDown}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-md text-zinc-500 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-300 animate-slow-bounce cursor-pointer"
                    aria-label="Scroll Down"
                >
                    <ChevronDown className="h-6 w-6" />
                </button>
            </div>
        </section>
    );
}