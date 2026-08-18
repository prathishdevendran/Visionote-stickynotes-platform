import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SubHero from './components/SubHero';
import Workspace from './components/Workspace';

export default function App() {
    const [view, setView] = useState('landing'); // 'landing' or 'workspace'

    return (
        <div className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-indigo-500 selection:text-white select-none">
            {view === 'landing' ? (
                <>
                    <Navbar />
                    <main>
                        <Hero />
                        <SubHero onExplore={() => setView('workspace')} />
                    </main>
                </>
            ) : (
                <Workspace onBack={() => setView('landing')} />
            )}
        </div>
    );
}