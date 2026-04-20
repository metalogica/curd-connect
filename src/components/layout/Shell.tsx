import { Outlet } from "@tanstack/react-router";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

export function Shell() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative text-charcoal bg-offwhite border-8 border-black">
      <TopBar />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col items-stretch">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
