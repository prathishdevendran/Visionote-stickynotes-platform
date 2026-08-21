import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SubHero from './components/SubHero';
import Workspace from './components/Workspace';
import SignIn from './components/SignIn';

function LandingPage({ isSignIn, landingStyle, navigate }) {
    return (
        <div className="min-h-screen overflow-x-hidden relative">
            {/* Landing Page Slider Wrapper */}
            <div
                style={{
                    ...landingStyle,
                    transform: isSignIn ? 'translate3d(-100vw, 0, 0)' : 'translate3d(0, 0, 0)',
                }}
                className="min-h-screen transition-transform duration-700 ease-in-out"
            >
                <Navbar onGetStarted={() => navigate('/signin')} />
                <main>
                    <Hero />
                    <SubHero onExplore={() => navigate('/workspace')} />
                </main>
            </div>

            {/* SignIn Page Slider Wrapper */}
            <div
                className="fixed inset-0 z-40 transition-all duration-700 ease-in-out"
                style={{
                    transform: isSignIn ? 'translate3d(0, 0, 0)' : 'translate3d(100vw, 0, 0)',
                    visibility: isSignIn ? 'visible' : 'hidden'
                }}
            >
                <SignIn onBack={() => navigate('/')} />
            </div>
        </div>
    );
}

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);

    const isLandingRoute = location.pathname === '/' || location.pathname === '/signin';

    useEffect(() => {
        if (isLandingRoute) {
            document.body.style.overflow = location.pathname === '/' ? '' : 'hidden';
        } else {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [location.pathname, isLandingRoute]);

    useEffect(() => {
        if (!isLandingRoute) return;

        const handleScroll = () => {
            const totalHeight = window.innerHeight || 800;
            const currentScroll = window.scrollY;
            const progress = Math.min(1, Math.max(0, currentScroll / totalHeight));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLandingRoute]);

    // Interpolate values between Light Theme (White) and Dark Theme (Deep Slate-Indigo)
    const bgR = Math.round(255 - (255 - 255) * scrollProgress);
    const bgG = Math.round(255 - (255 - 255) * scrollProgress);
    const bgB = Math.round(255 - (255 - 210) * scrollProgress);

    const textR = Math.round(24 + (244 - 255) * scrollProgress);
    const textG = Math.round(24 + (244 - 255) * scrollProgress);
    const textB = Math.round(27 + (245 - 255) * scrollProgress);

    const textMutedR = Math.round(82 + (161 - 82) * scrollProgress);
    const textMutedG = Math.round(82 + (161 - 82) * scrollProgress);
    const textMutedB = Math.round(91 + (170 - 91) * scrollProgress);

    const borderR = Math.round(228 - (228 - 63) * scrollProgress);
    const borderG = Math.round(228 - (228 - 63) * scrollProgress);
    const borderB = Math.round(231 - (231 - 70) * scrollProgress);
    const borderA = (0.8 - (0.8 - 0.4) * scrollProgress).toFixed(2);

    const navR = bgR;
    const navG = bgG;
    const navB = bgB;

    const landingStyle = {
        '--bg-color': `rgb(${bgR}, ${bgG}, ${bgB})`,
        '--text-color': `rgb(${textR}, ${textG}, ${textB})`,
        '--text-muted': `rgb(${textMutedR}, ${textMutedG}, ${textMutedB})`,
        '--border-color': `rgba(${borderR}, ${borderG}, ${borderB}, ${borderA})`,
        '--nav-bg': `rgba(${navR}, ${navG}, ${navB}, 0.75)`,
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
    };

    return (
        <div className="min-h-screen antialiased selection:bg-indigo-500 selection:text-white select-none">
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage isSignIn={false} landingStyle={landingStyle} navigate={navigate} />
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <LandingPage isSignIn={true} landingStyle={landingStyle} navigate={navigate} />
                    }
                />
                <Route
                    path="/workspace"
                    element={
                        <Workspace onBack={() => navigate('/')} />
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}