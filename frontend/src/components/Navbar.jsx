export default function Navbar({ onGetStarted }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--nav-bg)] text-[var(--text-color)] backdrop-blur-md transition-colors duration-150">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <img
                        src="/visionate logo.png"
                        alt="Visionate Logo"
                        className="h-15 w-auto object-contain"
                    />
                    <span className="text-lg font-bold tracking-tight text-[var(--text-color)]">Vnotes</span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden items-center gap-15 text-base font-medium text-[var(--text-muted)] md:flex">
                    <a href="#home" className="transition-colors hover:text-[var(--text-color)]">Home</a>
                    <a href="#product" className="transition-colors hover:text-[var(--text-color)]">Product</a>
                    <a href="#about" className="transition-colors hover:text-[var(--text-color)]">About</a>
                    <a href="#contact" className="transition-colors hover:text-[var(--text-color)]">Contact</a>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onGetStarted}
                        className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 cursor-pointer"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}