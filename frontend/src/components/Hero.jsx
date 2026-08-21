import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {

    const handleScrollDown = () => {
        const subHero = document.getElementById('sub-hero');
        if (!subHero) return;

        const targetY = subHero.getBoundingClientRect().top + window.pageYOffset;
        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const difference = targetY - startY;
        const duration = 1000; // Duration in ms (1.8 seconds) for slow scrolling
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
                        transform: translateY(-10px);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0px);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                .animate-slow-bounce {
                    animation: slow-bounce 2s infinite;
                }  
                @keyframes spin-slow{
                    from{
                        transform: rotate(0deg);
                        }
                    to{
                        transform: rotate(360deg);
                    }
            }
                .animate-spin-slow{
                    animation: spin-slow 3s ease-in-out infinite;
                }
            `}</style>

            <div className="top-20 relative mx-auto max-w-5xl text-center flex-1 flex flex-col justify-center items-center">

                {/* Main Heading / Value Prop */}
                <h1 className="z-9 text-4xl font-extrabold tracking-tight text-[var(--text-color)] sm:text-5xl md:text-6xl">
                    <span className="block mb-1">Your thoughts, organized.</span>
                    <span className="text-indigo-600 block">Searchable at the speed of thought.</span>
                </h1>
                {/* Subtitle */}
                <p className="mx-auto mt-10 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">
                    A modern sticky-notes platform
                </p>

                {/* Logo & Loading Arch Container */}
                <div className='relative top-15 flex items-center justify-center w-[200px] h-[400px] -mt-25 mb-8'>
                    {/* Rotating paper */}
                    <img
                        src='/stick arch.png'
                        alt="Sticky Arch"
                        className="absolute inset-0 w-full h-full object-contain animate-spin-slow"
                    />
                    <button
                        type="button"
                        onClick={handleScrollDown}
                        className="z-10 flex items-center justify-center rounded-full transition-all duration-300 animate-slow-bounce cursor-pointer"
                        aria-label="Scroll Down"
                    >
                        {/* Smaller Brand Logo Centered */}
                        <img
                            src="/visionate logo.png"
                            alt="visionate logo"
                            className='relative h-[200px] w-auto object-contain'
                        />
                    </button>
                </div>



            </div>
        </section>
    );
}