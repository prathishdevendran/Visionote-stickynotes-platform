import React from 'react';
import { Pin, Lock, Trash2, Edit3, Tag } from 'lucide-react';

const THEMES = {
    amber: { bg: '#fef08a', text: 'text-amber-955', tag: 'bg-amber-100 text-amber-900 border-amber-300' },
    indigo: { bg: '#e0e7ff', text: 'text-indigo-950', tag: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
    emerald: { bg: '#bbf7d0', text: 'text-emerald-955', tag: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    rose: { bg: '#fecdd3', text: 'text-rose-950', tag: 'bg-rose-100 text-rose-900 border-rose-300' },
    purple: { bg: '#e9d5ff', text: 'text-purple-950', tag: 'bg-purple-100 text-purple-900 border-purple-300' },
    cyan: { bg: '#cffafe', text: 'text-cyan-950', tag: 'bg-cyan-100 text-cyan-900 border-cyan-300' },
    orange: { bg: '#fed7aa', text: 'text-orange-950', tag: 'bg-orange-100 text-orange-900 border-orange-300' },
    blue: { bg: '#bfdbfe', text: 'text-blue-955', tag: 'bg-blue-100 text-blue-900 border-blue-300' },
    lime: { bg: '#d9f99d', text: 'text-lime-950', tag: 'bg-lime-100 text-lime-900 border-lime-300' },
    pink: { bg: '#fbcfe8', text: 'text-pink-950', tag: 'bg-pink-100 text-pink-900 border-pink-300' },
    violet: { bg: '#ddd6fe', text: 'text-violet-950', tag: 'bg-violet-100 text-violet-900 border-violet-300' },
    red: { bg: '#fecaca', text: 'text-red-950', tag: 'bg-red-100 text-red-900 border-red-300' },
    yellow: { bg: '#fef08a', text: 'text-yellow-950', tag: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
};

/**
 * StickyNote Component with Realistic Folded Corner
 */
export default function StickyNote({
    title = 'Draft Note',
    content = '',
    color = 'amber',
    tags = [],
    isPinned = true,
    isEncrypted = false,
    updatedAt = '',
    mode = 'display',
    onEdit,
    onDelete,
    onPin,
    onToggleEncrypt,
    className = ''
}) {
    const isInteractive = mode === 'workspace';
    const isPredefined = color in THEMES;
    const theme = isPredefined
        ? THEMES[color]
        : {
            bg: color,
            text: 'text-zinc-900',
            tag: 'bg-white/40 text-zinc-800 border-zinc-300/40'
        };

    return (
        <div
            className={`group relative flex flex-col justify-between p-6 shadow-2xl shadow-black/25 hover:shadow-black/35 transition-all duration-300 rounded-none aspect-square ${theme.text} ${isInteractive ? 'hover:-translate-y-2' : ''
                } ${className}`}
            style={{
                backgroundColor: theme.bg
            }}
        >

            {/* Top Header Bar */}
            <div className="relative z-10 flex items-start justify-between gap-3">
                <h3 className="font-extrabold text-2xl tracking-tight line-clamp-2 leading-none text-black font-handwriting">
                    {title}
                </h3>

                {/* Status Badges & Pin */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {isEncrypted && (
                        <span
                            className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 text-[11px] font-bold shadow-sm text-black border border-black/20 transition-colors hover:bg-white"
                            title={isInteractive ? 'Click to toggle encryption' : 'Client-side Encrypted'}
                            onClick={isInteractive ? onToggleEncrypt : undefined}
                            role={isInteractive ? 'button' : undefined}
                            style={{ cursor: isInteractive ? 'pointer' : 'default' }}
                        >
                            <Lock className="h-3 w-3 text-black" />
                            <span>Encrypted</span>
                        </span>
                    )}

                    {isPinned && (
                        <button
                            type="button"
                            disabled={!isInteractive}
                            onClick={isInteractive ? onPin : undefined}
                            className={`p-1 transition ${isInteractive ? 'hover:bg-black/10 cursor-pointer' : 'cursor-default'
                                }`}
                            title="Pinned Note"
                        >
                            <Pin className="h-4 w-4 fill-black text-black rotate-45" />
                        </button>
                    )}
                </div>
            </div>

            {/* Note Content Body */}
            <p className="relative z-10 mt-3 text-lg leading-snug font-bold text-black/95 line-clamp-5 font-handwriting flex-1">
                {content}
            </p>

            {/* Footer Area: Tags & Action Controls */}
            <div className="relative z-10 mt-5 pt-3 border-t border-black/10 flex items-center justify-between gap-2 text-xs">
                {/* Tags List */}
                <div className="flex flex-wrap gap-1.5 items-center">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${theme.tag}`}
                        >
                            <Tag className="h-2.5 w-2.5 opacity-70" />
                            {tag}
                        </span>
                    ))}
                    {updatedAt && (
                        <span className="text-[11px] opacity-60 ml-1 font-mono">
                            {updatedAt}
                        </span>
                    )}
                </div>

                {/* Interactive Mode Action Buttons */}
                {isInteractive && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onEdit && (
                            <button
                                type="button"
                                onClick={onEdit}
                                className="p-1.5 rounded-lg hover:bg-black/10 text-black/60 hover:text-black/80 transition"
                                title="Edit Note"
                            >
                                <Edit3 className="h-3.5 w-3.5" />
                            </button>
                        )}

                        {onDelete && (
                            <button
                                type="button"
                                onClick={onDelete}
                                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-700 transition"
                                title="Delete Note"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
