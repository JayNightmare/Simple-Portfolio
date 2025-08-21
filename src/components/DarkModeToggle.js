import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./DarkModeToggle.css";

const DarkModeToggle = ({ className = "" }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            className={`dark-mode-toggle ${className}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        >
            <div className="toggle-container">
                <div className="toggle-slider">
                    <span className="toggle-icon sun">☀️</span>
                    <span className="toggle-icon moon">🌙</span>
                </div>
            </div>
        </button>
    );
};

export default DarkModeToggle;
