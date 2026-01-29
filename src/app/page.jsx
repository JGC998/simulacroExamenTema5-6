import Link from "next/link";
import { Hospital, BedDouble, Pill, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="flex flex-col items-center gap-10 w-full max-w-5xl">
        <h1 className="text-6xl font-black text-white drop-shadow-md tracking-tight flex items-center gap-4">
          <Hospital size={64} className="text-white" />
          HOSPITAL
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <Link
            href="/plantas"
            className="group relative flex flex-col items-center justify-center gap-6 p-10 rounded-2xl 
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-xl 
            hover:scale-105 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300"
          >
            <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 group-hover:scale-110 transition-transform">
              <BedDouble size={48} />
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-wide">
              PLANTAS
            </span>
          </Link>

          <Link
            href="/medicinas"
            className="group relative flex flex-col items-center justify-center gap-6 p-10 rounded-2xl 
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-xl 
            hover:scale-105 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300"
          >
            <div className="p-4 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300 group-hover:scale-110 transition-transform">
              <Pill size={48} />
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-wide">
              MEDICINAS
            </span>
          </Link>

          <Link
            href="/pacientes"
            className="group relative flex flex-col items-center justify-center gap-6 p-10 rounded-2xl 
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-xl 
            hover:scale-105 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300"
          >
            <div className="p-4 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300 group-hover:scale-110 transition-transform">
              <Users size={48} />
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-wide">
              PACIENTES
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

