import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "normal" | "spidy";

interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem("portfolio-theme-mode");
        return (saved as ThemeMode) || "normal";
    });

    const toggleMode = () => {
        setMode((prev) => {
            const next = prev === "normal" ? "spidy" : "normal";
            localStorage.setItem("portfolio-theme-mode", next);
            return next;
        });
    };

    useEffect(() => {
        if (mode === "spidy") {
            document.body.classList.add("spidy-mode");
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("spidy-mode");
            document.body.classList.remove("dark");
        }
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
