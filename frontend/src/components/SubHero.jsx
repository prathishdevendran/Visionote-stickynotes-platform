import React, { useState, useEffect, useRef } from 'react';
import { Pin } from 'lucide-react';
import StickyNote from './StickyNote';

// 16 Predefined coordinate offsets (expressed in viewport vh/vw units) 
// to display floating notes surrounding the center "Try Now" button.
const FIXED_POSITIONS = [
    // Outer Border Row 1
    { top: 8, left: 4 },
    { top: 8, left: 81 },
    // Outer Border Row 2
    { top: 30, left: 3 },
    { top: 30, left: 83 },
    // Outer Border Row 3
    { top: 52, left: 5 },
    { top: 52, left: 80 },
    // Outer Border Row 4
    { top: 74, left: 4 },
    { top: 74, left: 82 },
    // Inner Rings Row 1
    { top: 18, left: 20 },
    { top: 18, left: 64 },
    // Inner Rings Row 2
    { top: 42, left: 19 },
    { top: 42, left: 66 },
    // Inner Rings Row 3
    { top: 66, left: 21 },
    { top: 66, left: 63 },
    // Top-Bottom Center Alignments
    { top: 60, left: 43 },
    { top: 10, left: 43 },
];

// Content metadata list for the background notes showcasing platform features
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
        title: "Key Note",
        content: "Ideas to Future",
        color: "white"
    },
    {
        title: "Welcome",
        content: "Restore note checkpoints from previous edits easily.",
        color: "indigo"
    }
];

/**
 * SubHero Component
 * 
 * Renders the secondary fold (features board) of the landing page.
 * Distributes features as sticky notes randomly floating in coordinates around the viewport.
 * 
 * Performance Optimization:
 * Opacity and scale are linked to scroll progress via a CSS Custom Property `--subhero-progress`.
 * Updates are done directly on `subHeroRef.current` without calling React state hooks, preventing
 * laggy re-renders of the 16 StickyNote elements.
 * 
 * @param {object} props
 * @param {function} props.onExplore - Navigates user to workspace upon vacuum animation completion.
 */
export default function SubHero({ onExplore }) {
    const [notes, setNotes] = useState([]);

    // isSucking triggers a vacuum visual effect that pulls all notes to the center button before transitioning
    const [isSucking, setIsSucking] = useState(false);

    // Target reference to write styling custom variables directly on DOM
    const subHeroRef = useRef(null);

    // Initialize placement coordinate values on load
    useEffect(() => {
        const placedNotes = INITIAL_NOTES.map((note, index) => {
            const position = FIXED_POSITIONS[index] || { top: 50, left: 50 };
            // Add subtle random-looking rotation (-2.5deg to 2.5deg) for authentic layout
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

    // Sets custom CSS progress variable on scroll, avoiding React re-rendering
    useEffect(() => {
        const handleScroll = () => {
            const element = subHeroRef.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Opacity starts at 0% when the section top enters the screen,
            // and reaches 100% when the section top has filled 60% of the screen height.
            const startScroll = viewportHeight;
            const endScroll = viewportHeight * 0.4;

            const progress = (startScroll - rect.top) / (startScroll - endScroll);
            const clampedProgress = Math.max(0, Math.min(1, progress));
            element.style.setProperty('--subhero-progress', clampedProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initialize states

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /**
     * Sucking vacuum animation handler:
     * Pulls notes to center, scales them to zero, then triggers navigation.
     */
    const handleExploreClick = () => {
        setIsSucking(true);
        // Delay navigation until notes finish sucking/fading out sequentially
        setTimeout(() => {
            if (onExplore) {
                onExplore();
            }
            setIsSucking(false);
        }, 600 + INITIAL_NOTES.length * 50);
    };

    return (
        <section
            ref={subHeroRef}
            id="sub-hero"
            className="relative flex items-center justify-center min-h-[calc(100vh)] overflow-hidden bg-transparent"
            style={{
                opacity: 'var(--subhero-progress, 0)',
                transition: 'opacity 0.2s ease-out'
            }}
        >
            <style>{`
                /* Slow float bobbing animation for the floating cards */
                @keyframes float-bob {
                    0%, 100% {
                        transform: translate3d(0, -10px, 0);
                    }
                    50% {
                        transform: translate3d(0, 25px, 0);
                    }
                }
                .animate-float-bob {
                    animation: float-bob 15s ease-in-out infinite;
                    will-change: transform;
                }
                /* Hover scaling controls */
                .note-hover-wrapper {
                    position: relative;
                    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    transform: scale(1);
                    cursor: pointer;
                }
                .note-hover-wrapper:hover {
                    opacity: 1;
                    transform: scale(1.1) rotate(2.5deg) ;
                }
                /* Bobbing animation for the center yellow pin note button */
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
                /* Glowing animation for the pin note */
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
                .eager-glow-button {
                    transition: all 0.5s ease-in-out;
                }
                .eager-glow-button .try-now-text,
                .eager-glow-button .click-to-enter-text {
                    transition: all 0.3s ease-in-out;
                }s
                .click-to-enter-text {
                    opacity: 0.5;
                }
                .eager-glow-button:hover .try-now-text {
                    color: #d97706; /* Golden amber */
                    text-shadow: 0 0 20px #ffa200ff, 0 0 20px #fbbf24;
                }
                .eager-glow-button:hover .click-to-enter-text {
                    color: #d97706; /* Golden amber */
                    opacity: 1;
                    text-shadow: 0 0 6px #f59e0b;
                }
            `}</style>

            {/* Background Decorative Floating Sticky Notes */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {notes.map((note, idx) => {
                    // noteStyle resolves to:
                    // - vacuum animation coordinates if isSucking is active
                    // - scroll-driven scaling (calc using --subhero-progress CSS variable) under normal scroll
                    const noteStyle = isSucking ? {
                        top: note.top,
                        left: note.left,
                        transform: `translate3d(calc(50vw - ${note.leftVal}vw - 144px), calc(50vh - ${note.topVal}vh - 144px), 0) scale(0) rotate(720deg)`,
                        opacity: 0,
                        transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 2s cubic-bezier(0.25, 1, 0.5, 1)',
                        transitionDelay: `${idx * 0.05}s`
                    } : {
                        top: note.top,
                        left: note.left,
                        transform: `translate3d(0, 0, 0) scale(calc(0.5 + var(--subhero-progress, 0) * 0.6)) rotate(${note.rotate || '0deg'})`,
                        opacity: 1,
                        transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
                        willChange: 'transform, opacity' // Hardware-accelerate this layer
                    };

                    return (
                        <div
                            key={idx}
                            className="absolute w-72 z-10 hover:z-50"
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
                                        isPinned={false}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Center Explore Button (Styled as a pinned note card) */}
            <div className="relative z-10 ">
                <button
                    type="button"
                    onClick={handleExploreClick}
                    disabled={isSucking}
                    style={{ backgroundColor: '#fef08a' }}
                    className={`eager-glow-button relative flex flex-col items-center justify-between w-36 h-36 p-4 animate-eager-glow transition-all duration-500 rotate-[-4deg] hover:rotate-[4deg] hover:scale-110 active:scale-95 cursor-pointer text-yellow-950 font-handwriting ${isSucking ? 'scale-0 opacity-0 pointer-events-none transition-all duration-1000' : ''
                        }`}
                >
                    {/* Pin illustration at the top center */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2">
                        <Pin className="h-5 w-5 fill-red-500 text-red-600 drop-shadow-sm rotate-45" />
                    </div>

                    <div className="flex-1 flex items-center justify-center mt-4">
                        <span className="try-now-text text-3xl tracking-tight text-amber-950 select-none">
                            Try Now
                        </span>
                    </div>

                    <div className="click-to-enter-text text-[10px] font-mono tracking-wider uppercase select-none">
                        click to enter
                    </div>
                </button>
            </div>

        </section>
    );
}
