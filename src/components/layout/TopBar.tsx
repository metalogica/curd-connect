import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Map, Plus, LogIn } from "lucide-react";

export function TopBar() {
  return (
    <header className="border-b-4 border-black bg-curd px-6 py-6 flex justify-between items-center z-50">
      <div>
        <Link
          to="/"
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none inline-block font-mono"
        >
          CurdConnect
        </Link>
        <p className="text-sm font-bold uppercase tracking-widest mt-1 hidden md:block">
          Connexion Caillé — Montreal's Poutine Hub
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <SignedIn>
          <Link
            to="/map"
            className="border-4 border-black bg-white px-2 md:px-6 py-2 font-black hover:bg-gravy hover:text-white transition-colors uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 hidden sm:flex items-center gap-1"
          >
            <Map size={18} /> Carte
          </Link>
          <Link
            to="/create-store"
            className="border-4 border-black bg-black text-white px-2 md:px-6 py-2 font-black hover:bg-white hover:text-black transition-colors uppercase text-sm shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center gap-1"
          >
            <Plus size={18} /> Add
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <Link
            to="/map"
            className="border-4 border-black bg-white px-2 md:px-6 py-2 font-black hover:bg-gravy hover:text-white transition-colors uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 hidden sm:flex items-center gap-1"
          >
            <Map size={18} /> Carte
          </Link>
          <Link
            to="/sign-in"
            className="border-4 border-black bg-white px-4 md:px-6 py-2 font-black hover:bg-gravy hover:text-white transition-colors uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center gap-1"
          >
            <LogIn size={18} className="hidden sm:block" /> Sign In / S'inscrire
          </Link>
        </SignedOut>
      </div>
    </header>
  );
}
