export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-200/80 bg-white/75 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <img
                        src="/visionate logo.png"
                        alt="Visionate Logo"
                        className="h-15 w-auto object-contain"
                    />
                    <span className="text-lg font-bold tracking-tight text-zinc-900">Visionate</span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex">
                    <a href="#home" className="text-zinc-900 transition-colors hover:text-indigo-600">Home</a>
                    <a href="#product" className="transition-colors hover:text-zinc-900">Product</a>
                    <a href="#about" className="transition-colors hover:text-zinc-900">About</a>
                    <a href="#contact" className="transition-colors hover:text-zinc-900">Contact</a>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <a
                        href="#signin"
                        className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900"
                    >
                        Sign in
                    </a>
                    <a
                        href="#get-started"
                        className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </header>
    );
}