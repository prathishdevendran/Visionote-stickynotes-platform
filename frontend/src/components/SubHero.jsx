import React, { useState, useEffect } from 'react';
import StickyNote from './StickyNote';

const ZONES = [
    // Top
    { top: [10, 20], left: [2, 14] },
    { top: [12, 22], left: [14, 26] },

    { top: [10, 15], left: [30, 42] },
    { top: [10, 15], left: [46, 58] },

    { top: [8, 10], left: [60, 72] },
    { top: [12, 22], left: [64, 76] },

    // Middle
    { top: [24, 34], left: [2, 14] },
    { top: [36, 46], left: [14, 26] },

    { top: [24, 34], left: [62, 74] },
    { top: [36, 46], left: [48, 60] },

    // Bottom — moved up
    { top: [46, 56], left: [2, 14] },
    { top: [56, 66], left: [14, 26] },

    { top: [60, 70], left: [32, 44] },
    { top: [60, 70], left: [48, 60] },

    { top: [46, 56], left: [62, 74] }
];
const INITIAL_NOTES = [
    {
        title: "Security",
        content: "Zero-knowledge encryption ensures your data remains completely private.",
        color: "rose"
    },
    {
        title: "Local-First",
        content: "Access your notes anytime, anywhere. Fully functional offline.",
        color: "emerald"
    },
    {
        title: "Semantic Search",
        content: "Search by meaning and concept, not just exact keywords.",
        color: "indigo"
    },
    {
        title: "Markdown Support",
        content: "Write cleanly using standard formatting you already know.",
        color: "amber"
    },
    {
        title: "Custom Tags",
        content: "Organize note boards dynamically with custom categorized tags.",
        color: "purple"
    },
    {
        title: "Quick Sync",
        content: "Synchronize across devices with end-to-end encryption active.",
        color: "cyan"
    },
    {
        title: "Graph View",
        content: "Visualize how your thoughts link together in a network.",
        color: "violet"
    },
    {
        title: "Dark Mode",
        content: "Sleek eye-friendly interface designed for late night sessions.",
        color: "orange"
    },
    {
        title: "Export PDF",
        content: "Export note boards to beautifully formatted PDF documents.",
        color: "blue"
    },
    {
        title: "Keyboard Shortcuts",
        content: "Navigate and manage boards instantly without touch.",
        color: "lime"
    },
    {
        title: "Collaboration",
        content: "Securely share encrypted workspaces with trusted peers.",
        color: "pink"
    },
    {
        title: "OCR Scanner",
        content: "Convert handwritten image uploads into editable text notes.",
        color: "yellow"
    },
    {
        title: "Audio Transcripts",
        content: "Record voice memos and generate automatic smart tags.",
        color: "red"
    },
    {
        title: "Daily Journal",
        content: "A dedicated space for reflective daily habits and logs.",
        color: "amber"
    },
    {
        title: "Version History",
        content: "Restore note checkpoints from previous edits easily.",
        color: "indigo"
    }
]; export default function SubHero({ onExplore }) {
    const [notes, setNotes] = useState([]);
    const [isSucking, setIsSucking] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // Randomize assignments on mount
        const shuffledZones = [...ZONES].sort(() => 0.5 - Math.random());

        const randomizedNotes = INITIAL_NOTES.map((note, index) => {
            const zone = shuffledZones[index];
            const randomTop = Math.floor(Math.random() * (zone.top[1] - zone.top[0] + 1)) + zone.top[0];
            const randomLeft = Math.floor(Math.random() * (zone.left[1] - zone.left[0] + 1)) + zone.left[0];

            return {
                ...note,
                topVal: randomTop,
                leftVal: randomLeft,
                top: `${randomTop}vh`,
                left: `${randomLeft}vw`,
            };
        });

        setNotes(randomizedNotes);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('sub-hero');
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Opacity goes from 0 when it starts entering viewport, to 1 when it fills 75% of viewport
            const startScroll = viewportHeight;
            const endScroll = viewportHeight * 0.25;

            const progress = (startScroll - rect.top) / (startScroll - endScroll);
            const clampedOpacity = Math.max(0, Math.min(1, progress));
            setOpacity(clampedOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Set initial opacity state

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleExploreClick = () => {
        setIsSucking(true);
        setTimeout(() => {
            if (onExplore) {
                onExplore();
            }
        }, 600 + INITIAL_NOTES.length * 50);
    };

    return (
        <section
            id="sub-hero"
            className="relative flex items-center justify-center min-h-[calc(100vh)] overflow-hidden bg-white"
            style={{ opacity: opacity, transition: 'opacity 0.2s ease-out' }}
        >
            <style>{`
                @keyframes float-bob {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-16px);
                    }
                }
                .animate-float-bob {
                    animation: float-bob 6s ease-in-out infinite;
                }
                .animate-float-bob:hover {
                    z-index: 50;
                }
                .note-hover-wrapper {
                    position: relative;
                    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    opacity: 0.9;
                    transform: scale(0.6);
                    cursor: pointer;
                }
                .note-hover-wrapper:hover {
                    opacity: 1;
                    transform: scale(0.8) rotate(2.5deg);
                }
            `}</style>

            {/* Background Decorative Sticky Notes */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {notes.map((note, idx) => {
                    const noteStyle = isSucking ? {
                        top: note.top,
                        left: note.left,
                        transform: `translate(calc(50vw - ${note.leftVal}vw - 130px), calc(50vh - ${note.topVal}vh - 120px)) scale(0) rotate(720deg)`,
                        opacity: 0,
                        transition: 'transform 2.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.2s cubic-bezier(0.25, 1, 0.5, 1)',
                        transitionDelay: `${idx * 0.05}s`
                    } : {
                        top: note.top,
                        left: note.left,
                        transform: 'translate(0, 0) scale(1) rotate(0deg)',
                        opacity: 0.9,
                        transition: 'transform 2.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.2s cubic-bezier(0.25, 1, 0.5, 1)'
                    };

                    return (
                        <div
                            key={idx}
                            className="absolute w-65"
                            style={noteStyle}
                        >
                            <div className={isSucking ? '' : 'animate-float-bob'} style={{ animationDelay: `${idx * -1.5}s` }}>
                                <div className="pointer-events-auto note-hover-wrapper">
                                    <StickyNote
                                        mode="display"
                                        title={note.title}
                                        content={note.content}
                                        color={note.color}
                                        tags={note.tags}
                                        isEncrypted={note.isEncrypted}
                                        isPinned={note.isPinned}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Center Explore Button */}
            <div className="relative z-10">
                <button
                    type="button"
                    onClick={handleExploreClick}
                    disabled={isSucking}
                    className={`relative group overflow-hidden rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-1000 active:scale-[0.98] cursor-pointer ${isSucking ? 'scale-[1.3] shadow-2xl shadow-indigo-600/40 opacity-90' : 'hover:-translate-y-0.5'
                        }`}
                >
                    <span className="relative z-10">Explore</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
            </div>
        </section>
    );
}
