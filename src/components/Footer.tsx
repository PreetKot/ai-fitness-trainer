import { ZapIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t-0 bg-gradient-to-r from-primary/90 via-background/90 to-secondary/90 shadow-inner">
      {/* Top border glow */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-sm"></div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="relative flex items-center">
                <ZapIcon className="w-6 h-6 text-yellow-400 animate-pulse drop-shadow" />
                <span className="ml-2 text-2xl font-extrabold font-mono text-white tracking-tight drop-shadow">
                  CBUM<span className="text-yellow-400">.AI</span>
                </span>
              </span>
            </Link>
            <p className="text-sm text-white/70 font-mono">
              © {new Date().getFullYear()} CBUM.AI — All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-2 text-base">
            <Link
              href="/about"
              className="text-white/80 hover:text-yellow-400 transition-colors font-mono"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="text-white/80 hover:text-yellow-400 transition-colors font-mono"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-white/80 hover:text-yellow-400 transition-colors font-mono"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-yellow-400 transition-colors font-mono"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-white/80 hover:text-yellow-400 transition-colors font-mono"
            >
              Blog
            </Link>
            <Link
              href="/help"
              className="text-white/80 hover:text-yellow-400 transition-colors font-mono"
            >
              Help
            </Link>
          </div>

          {/* System Status */}
          <div className="flex items-center gap-3 px-4 py-2 border-2 border-yellow-400 rounded-lg bg-black/60 shadow-lg">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs font-mono text-yellow-300 tracking-widest">
              SYSTEM OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;