import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, Lock, FileText, Pin, Check } from 'lucide-react';
import StickyNote from './StickyNote';



export default function Workspace({ onBack }) {


    return (
        <div className="min-h-screen bg-zinc-50/50 pb-20 pt-6">
            <div className="mx-auto max-w-6xl px-6">

                {/* Header Actions */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onBack}
                            className="group flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:bg-zinc-50"
                            title="Back to Landing"
                        >
                            <ArrowLeft className="h-5 w-5 text-zinc-600 transition group-hover:-translate-x-0.5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Your Workspace</h1>
                            <p className="text-xs text-zinc-500">Manage and protect your personal records</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
