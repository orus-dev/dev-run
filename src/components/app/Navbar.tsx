"use client";

import Link from "next/link";
import { Radio, Trophy, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navs = [
  {
    link: "/problems",
    icon: Zap,
    name: "Problems",
  },
  {
    link: "/leaderboards",
    icon: Trophy,
    name: "Leaderboards",
  },
  {
    link: "/runs",
    icon: Radio,
    name: "Live",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img
                alt="Logo"
                src="/dev-run.svg"
                className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Dev<span className="text-primary">Run</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navs.map(({ link, icon: Icon, name }) => (
              <Link
                key={link}
                href={link}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-secondary",
                  pathname === link && "text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
                {name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-all duration-300 hover:scale-105 glow-purple hover:glow-purple-intense">
              Start Run
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
