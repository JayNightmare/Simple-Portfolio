import React, { useState } from "react";
import RepositoryModal from "./RepositoryModal";
import "../styles/LanguageCards.css";

const LanguageCards = ({ languageGroups }) => {
    const [selectedRepository, setSelectedRepository] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRepositoryClick = (repository) => {
        setSelectedRepository(repository);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRepository(null);
    };
    const getLanguageColor = (language) => {
        const colors = {
            JavaScript: "#f7df1e",
            Python: "#3776ab",
            Java: "#ed8b00",
            TypeScript: "#3178c6",
            "C++": "#00599c",
            "C#": "#239120",
            PHP: "#777bb4",
            Ruby: "#cc342d",
            Go: "#00add8",
            Rust: "#000000",
            Swift: "#fa7343",
            Kotlin: "#7f52ff",
            HTML: "#e34f26",
            CSS: "#1572b6",
            Shell: "#89e051",
            PowerShell: "#012456",
            Dockerfile: "#2496ed",
            Other: "#6f42c1",
        };
        return colors[language] || "#6c757d";
    };

    const getLanguageIcon = (language) => {
        const icons = {
            JavaScript: "🟨",
            Python: "🐍",
            Java: "☕",
            TypeScript: "🔷",
            "C++": "⚡",
            "C#": "🔵",
            PHP: "🐘",
            Ruby: "💎",
            Go: "🐹",
            Rust: "🦀",
            Swift: "🕊️",
            Kotlin: "🟣",
            HTML: "🌐",
            CSS: "🎨",
            Shell: "🐚",
            PowerShell: "💙",
            Dockerfile: "🐳",
            Other: "📁",
        };
        return icons[language] || "📄";
    };

    if (!languageGroups || Object.keys(languageGroups).length === 0) {
        return (
            <section className="language-cards">
                <div className="container">
                    <h2>Technologies & Languages</h2>
                    <p>Loading language data...</p>
                </div>
            </section>
        );
    }

    // * Organization Icons
    const getOrgIcon = (repo) => {
        if (repo.owner && repo.owner.type === "Organization") {
            return (
                <img
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login} logo`}
                    className="org-icon-card"
                    width="16"
                    height="16"
                />
            );
        }
        return null;
    };

    return (
        <section id="technologies" className="language-cards">
            <div className="container">
                <h2>Technologies & Languages</h2>
                <div className="language-grid">
                    {Object.entries(languageGroups)
                        .sort(([, a], [, b]) => b.length - a.length)
                        .map(([language, repos]) => (
                            <div
                                key={language}
                                className="language-card"
                                style={{
                                    borderLeftColor: getLanguageColor(language),
                                }}
                            >
                                <div className="language-header">
                                    <span className="language-icon">
                                        {getLanguageIcon(language)}
                                    </span>
                                    <h3>{language}</h3>
                                    <span className="repo-count">
                                        {repos.length} repos
                                    </span>
                                </div>
                                <div className="repos-list">
                                    {repos.slice(0, 3).map((repo, index) => (
                                        <div
                                            key={repo.id}
                                            className="repo-item"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleRepositoryClick(repo)
                                                }
                                                className="repo-link"
                                                type="button"
                                            >
                                                {repo.name}
                                            </button>
                                            <div className="repo-stats">
                                                {getOrgIcon(repo)}
                                                {repo.stargazers_count > 0 && (
                                                    <span className="stars">
                                                        ⭐{" "}
                                                        {repo.stargazers_count}
                                                    </span>
                                                )}
                                                {repo.forks_count > 0 && (
                                                    <span className="forks">
                                                        🍴 {repo.forks_count}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {repos.length > 3 && (
                                        <span className="more-repos">
                                            +{repos.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <RepositoryModal
                repository={selectedRepository}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
};

export default LanguageCards;
