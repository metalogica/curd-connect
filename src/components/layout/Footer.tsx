export function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black text-white p-3 font-mono text-[10px] flex flex-col sm:flex-row justify-between uppercase tracking-widest mt-auto">
      <div>© {new Date().getFullYear()} Curd Connect</div>
      <div className="flex gap-6 italic">
        <span>Fait avec amour à Montréal</span>
        <span>Terms of Service / Conditions</span>
      </div>
    </footer>
  );
}
