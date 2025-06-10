"use client";

import { useState } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, MenuIcon, SunIcon, MoonIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode (implement logic as needed)
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/80 via-background/80 to-secondary/80 backdrop-blur-md border-b border-border py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex flex-col items-start gap-0 group">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold font-mono text-primary drop-shadow-lg tracking-tight">
              CBUM.AI
            </span>
            {/* Animated AI pulse */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-mono tracking-wide group-hover:text-primary transition-colors">
            Your AI Fitness Partner
          </span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded hover:bg-primary/10 transition"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <MenuIcon size={22} />
        </button>

        {/* NAVIGATION */}
        {/* NAVIGATION */}
        <nav
          className={`flex-col md:flex-row flex md:flex items-center gap-5 absolute md:static top-16 left-0 w-full md:w-auto bg-background md:bg-transparent p-4 md:p-0 transition-all duration-300 z-40 ${
            menuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
          >
            <HomeIcon size={16} />
            <span>Home</span>
          </Link>
          <Link
            href="/generate-program"
            className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
          >
            <DumbbellIcon size={16} />
            <span>Generate</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
          >
            <UserIcon size={16} />
            <span>Profile</span>
          </Link>
          {/* Fitness Tools Dropdown */}
          <div className="relative group">
            <Button
              variant="ghost"
              className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
            >
              <span>Fitness Tools</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
            <div className="absolute left-0 mt-2 w-48 bg-background border border-border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              <Link
                href="/calorie-calculator"
                className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
              >
                Calorie Calculator
              </Link>
              <Link
                href="/bmi-calculator"
                className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
              >
                BMI Calculator
              </Link>
              <Link
                href="/macro-calculator"
                className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
              >
                Macro Calculator
              </Link>
              <Link
                href="/workout-timer"
                className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
              >
                Workout Timer
              </Link>
            </div>
          </div>
          {/* Dark/Light Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </Button>
          {/* Auth Buttons */}
          {isSignedIn ? (
            <UserButton />
          ) : (
            <div className="flex gap-2">
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
