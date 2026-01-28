"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 opacity-50 cursor-wait">
                <Sun size={20} className="text-slate-400" />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Cambiar tema"
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            <span className="sr-only">Cambiar tema</span>
        </button>
    )
}
