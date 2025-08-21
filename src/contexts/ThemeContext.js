import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme) {
            return savedTheme === "dark";
        }
        // Check system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        // Save theme preference to localStorage
        localStorage.setItem("portfolio-theme", isDarkMode ? "dark" : "light");

        // Apply theme class to document
        document.documentElement.className = isDarkMode
            ? "dark-theme"
            : "light-theme";
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const value = {
        isDarkMode,
        toggleTheme,
        theme: isDarkMode ? "dark" : "light",
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export default ThemeContext;
