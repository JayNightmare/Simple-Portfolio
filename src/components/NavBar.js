import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/NavBar.css";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: "About", href: "#about", internal: true },
        { label: "Technologies", href: "#technologies", internal: true },
        { label: "Projects", href: "#projects", internal: true },
        { label: "Future Plans", href: "#future", internal: true },
        {
            label: "GitHub",
            href: "https://github.com/JayNightmare",
            icon: "💻",
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com/in/jordan-s-bell",
            icon: "💼",
        },
        {
            label: "Discord",
            href: "https://discord.com/users/373097473553727488",
            icon: "🎮",
        },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <span className="brand-text">Jay's Portfolio</span>
                </div>

                <div className="nav-controls">
                    <DarkModeToggle className="nav-theme-toggle" />
                    <button
                        className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                    {navItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className={`nav-link ${
                                item.internal ? "internal" : "external"
                            }`}
                            target={item.internal ? undefined : "_blank"}
                            rel={
                                item.internal
                                    ? undefined
                                    : "noopener noreferrer"
                            }
                            onClick={handleLinkClick}
                        >
                            {item.icon && (
                                <span className="nav-icon">{item.icon}</span>
                            )}
                            {item.label}
                        </a>
                    ))}
                    <div className="nav-menu-theme-toggle">
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
