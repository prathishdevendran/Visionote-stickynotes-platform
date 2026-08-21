import React, { useState, useEffect } from 'react';
import { Pin } from 'lucide-react';
import StickyNote from './StickyNote';

// 15 Fixed, spaced coordinates surrounding the center "Try Now" area
const FIXED_POSITIONS = [
    // Row 1
    { top: 8, left: 4 },
    { top: 8, left: 81 },
    // Row 2
    { top: 30, left: 3 },
    { top: 30, left: 83 },
    // Row 3
    { top: 52, left: 5 },
    { top: 52, left: 80 },
    // Row 4
    { top: 74, left: 4 },
    { top: 74, left: 82 },
    // Inner row 1
    { top: 18, left: 20 },
    { top: 18, left: 64 },
    // Inner row 2
    { top: 42, left: 19 },
    { top: 42, left: 66 },
    // Inner row 3
    { top: 66, left: 21 },
    { top: 66, left: 63 },
    // Center
    { top: 60, left: 43 },
    { top: 10, left: 43 },
];


const INITIAL_NOTES = [
    {
        title: "Security",
        content: "Zero-knowledge encryption ensures your data remains completely private.",
        color: "cyan"
    },
    {
        title: "Local-First",
        content: "Access your notes anytime, anywhere. Fully functional offline.",
        color: "emerald"
    },
    {
        title: "Semantic Search",
        content: "Search by meaning and concept, not just exact keywords.",
        color: "yellow"
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
        color: "rose"
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
        color: "violet"
    },
    {
        title: "Collaboration",
        content: "Securely share encrypted workspaces with trusted peers.",
        color: "pink"
    },
    {
        title: "OCR Scanner",
        content: "Convert handwritten image uploads into editable text notes.",
        color: "lime"
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
        title: "Try for Free",
        content: "Explore the Workspace",
        color: "white"
    },
    {
        title: "Welcome",
        content: "Restore note checkpoints from previous edits easily.",
        color: "indigo"
    }
];
export default function SubHero({ onExplore }) {
    const [notes, setNotes] = useState([]);
    const [isSucking, setIsSucking] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const placedNotes = INITIAL_NOTES.map((note, index) => {
            const position = FIXED_POSITIONS[index] || { top: 50, left: 50 };
            // Alternating subtle rotations (e.g. -2deg to 2deg) for a natural look
            const rotate = (index % 3 - 1) * 2.5;

            return {
                ...note,
                topVal: position.top,
                leftVal: position.left,
                top: `${position.top}vh`,
                left: `${position.left}vw`,
                rotate: `${rotate}deg`
            };
        });

        setNotes(placedNotes);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('sub-hero');
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Opacity goes from 0 when it starts entering viewport, to 1 when it fills 75% of viewport
            const startScroll = viewportHeight;
            const endScroll = viewportHeight * 0.01;

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
            setIsSucking(false);
        }, 600 + INITIAL_NOTES.length * 50);
    };
    const scrollScale = 0.5 + opacity * 0.6;

    return (

        <section
            id="sub-hero"
            className="relative flex items-center justify-center min-h-[calc(100vh)] overflow-hidden bg-transparent"
            style={{ opacity: opacity, transition: 'opacity 0.2s ease-out' }}
        >
            <style>{`
                @keyframes float-bob {
                    0%, 100% {
                        transform: translateY(-10px);
                    }
                    50% {
                        transform: translateY(25px);
                    }
                }
                .animate-float-bob {
                    animation: float-bob 15s ease-in-out infinite;
                }
                .note-hover-wrapper {
                    position: relative;
                    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    transform: scale(1);
                    cursor: pointer;
                }
                .note-hover-wrapper:hover {
                    opacity: 1;
                    transform: scale(1.3) rotate(2.5deg) ;
                }
                @keyframes eager-bob {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
                .animate-eager-bob {
                    animation: eager-bob 3s ease-in-out infinite;
                }
                @keyframes eager-glow {
                    0%, 100% {
                        box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15), 0 0 4px 1px rgba(99, 102, 241, 0.1);
                    }
                    50% {
                        box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.2), 0 0 16px 4px rgba(99, 102, 241, 0.4);
                    }
                }
                .animate-eager-glow {
                    animation: eager-glow 3s ease-in-out infinite;
                }
            `}</style>

            {/* Background Decorative Sticky Notes */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {/* Rotoating animation */}
                {notes.map((note, idx) => {
                    const noteStyle = isSucking ? {
                        top: note.top,
                        left: note.left,
                        transform: `translate3d(calc(50vw - ${note.leftVal}vw - 130px), calc(50vh - ${note.topVal}vh - 120px), 0) scale(0) rotate(720deg)`,
                        opacity: 0,
                        transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 2s cubic-bezier(0.25, 1, 0.5, 1)',
                        transitionDelay: `${idx * 0.05}s`
                    } : {
                        top: note.top,
                        left: note.left,
                        transform: `translate3d(0, 0, 0) scale(${scrollScale}) rotate(${note.rotate || '0deg'})`,
                        opacity: 1,
                        transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
                        willChange: 'transform, opacity' // Tells browser to hardware-accelerate this layer
                    };


                    return (
                        <div
                            key={idx}
                            className="absolute w-65 z-10 hover:z-50"
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
            <div className="relative z-10 animate-eager-bob">
                <button
                    type="button"
                    onClick={handleExploreClick}
                    disabled={isSucking}
                    style={{ backgroundColor: '#fef08a' }}
                    className={`relative flex flex-col items-center justify-between w-36 h-36 p-4 animate-eager-glow transition-all duration-500 rotate-[-4deg] hover:rotate-[4deg] hover:scale-110 active:scale-95 cursor-pointer text-yellow-950 font-handwriting ${isSucking ? 'scale-0 opacity-0 pointer-events-none transition-all duration-1000' : ''
                        }`}
                >
                    {/* Pin at the top */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2">
                        <Pin className="h-5 w-5 fill-red-500 text-red-600 drop-shadow-sm rotate-45" />
                    </div>

                    <div className="flex-1 flex items-center justify-center mt-4">
                        <span className="text-3xl font-extrabold tracking-tight text-amber-950 select-none">
                            Try Now
                        </span>
                    </div>

                    <div className="text-[10px] font-mono opacity-50 tracking-wider uppercase select-none">
                        click to enter
                    </div>
                </button>
            </div>

        </section>
    );
}
