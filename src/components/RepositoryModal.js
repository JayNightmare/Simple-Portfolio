import React, { useState, useEffect } from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // GitHub-like syntax highlighting
import gitHubService from "./GitHubService";
import "../styles/RepositoryModal.css";

const RepositoryModal = ({ repository, isOpen, onClose }) => {
    const [repoData, setRepoData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("readme");

    // Initialize markdown-it with plugins
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch (__) {}
            }
            return ""; // use external default escaping
        },
    });

    useEffect(() => {
        const fetchRepositoryData = async () => {
            setLoading(true);
            try {
                const data = await gitHubService.fetchRepositoryDetails(
                    repository.owner.login,
                    repository.name
                );
                setRepoData(data);
            } catch (error) {
                console.error("Error fetching repository data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && repository) {
            fetchRepositoryData();
        }
    }, [isOpen, repository]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
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
        };
        return colors[language] || "#6c757d";
    };

    const calculateLanguagePercentages = (languages) => {
        const total = Object.values(languages).reduce(
            (sum, bytes) => sum + bytes,
            0
        );
        return Object.entries(languages)
            .map(([language, bytes]) => ({
                language,
                percentage: ((bytes / total) * 100).toFixed(1),
                bytes,
                color: getLanguageColor(language),
            }))
            .sort((a, b) => b.bytes - a.bytes);
    };

    const renderTabContent = () => {
        if (!repoData) return null;

        switch (activeTab) {
            case "readme":
                return (
                    <div className="tab-content readme-content">
                        {repoData.readme ? (
                            <div
                                className="markdown-content"
                                dangerouslySetInnerHTML={{
                                    __html: md.render(repoData.readme),
                                }}
                            />
                        ) : (
                            <div className="no-readme">
                                <h3>📄 No README.md found</h3>
                                <p>
                                    This repository doesn't have a README file.
                                </p>
                            </div>
                        )}
                    </div>
                );
            case "languages":
                const languageData = calculateLanguagePercentages(
                    repoData.languages
                );
                return (
                    <div className="tab-content languages-content">
                        <h3>Languages used in this repository</h3>
                        <div className="languages-bar">
                            {languageData.map((lang, index) => (
                                <div
                                    key={lang.language}
                                    className="language-segment"
                                    style={{
                                        backgroundColor: lang.color,
                                        width: `${lang.percentage}%`,
                                    }}
                                    title={`${lang.language}: ${lang.percentage}%`}
                                />
                            ))}
                        </div>
                        <div className="languages-list">
                            {languageData.map((lang) => (
                                <div
                                    key={lang.language}
                                    className="language-item"
                                >
                                    <div className="language-info">
                                        <span
                                            className="language-dot"
                                            style={{
                                                backgroundColor: lang.color,
                                            }}
                                        />
                                        <span className="language-name">
                                            {lang.language}
                                        </span>
                                    </div>
                                    <div className="language-stats">
                                        <span className="language-percentage">
                                            {lang.percentage}%
                                        </span>
                                        <span className="language-size">
                                            {formatFileSize(lang.bytes)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "contributors":
                return (
                    <div className="tab-content contributors-content">
                        <h3>Contributors</h3>
                        <div className="contributors-list">
                            {repoData.contributors.map((contributor) => (
                                <div
                                    key={contributor.id}
                                    className="contributor-item"
                                >
                                    <img
                                        src={contributor.avatar_url}
                                        alt={contributor.login}
                                        className="contributor-avatar"
                                    />
                                    <div className="contributor-info">
                                        <span className="contributor-name">
                                            {contributor.login}
                                        </span>
                                        <span className="contributor-contributions">
                                            {contributor.contributions} commits
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="repository-modal-overlay" onClick={onClose}>
            <div
                className="repository-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="repo-header-info">
                        <div className="repo-icon">
                            {repository.owner.type === "Organization" ? (
                                <img
                                    src={repository.owner.avatar_url}
                                    alt={repository.owner.login}
                                    className="org-avatar"
                                />
                            ) : (
                                <span className="repo-icon-symbol">📁</span>
                            )}
                        </div>
                        <div className="repo-title">
                            <h2 className="repo-name-header">
                                <span className="owner-name">
                                    {repository.owner.login}
                                </span>
                                <span className="separator">/</span>
                                <span className="repo-name">
                                    {repository.name}
                                </span>
                            </h2>
                            {repository.private && (
                                <span className="private-badge">Private</span>
                            )}
                        </div>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading repository data...</p>
                    </div>
                ) : (
                    <>
                        <div className="repo-meta">
                            <p className="repo-description">
                                {repository.description}
                            </p>
                            <div className="repo-stats-modal">
                                <div className="stat-item">
                                    <span className="stat-icon">⭐</span>
                                    <span>
                                        {repository.stargazers_count} stars
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">🍴</span>
                                    <span>{repository.forks_count} forks</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">👁️</span>
                                    <span>
                                        {repository.watchers_count} watching
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">📊</span>
                                    <span>
                                        {formatFileSize(repository.size * 1024)}
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">🔄</span>
                                    <span>
                                        Updated{" "}
                                        {formatDate(repository.updated_at)}
                                    </span>
                                </div>
                            </div>
                            {repository.topics &&
                                repository.topics.length > 0 && (
                                    <div className="repo-topics">
                                        {repository.topics.map((topic) => (
                                            <span
                                                key={topic}
                                                className="topic-tag"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                )}
                        </div>

                        <div className="repo-modal-tabs">
                            <button
                                className={`tab-button ${
                                    activeTab === "readme" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("readme")}
                            >
                                📄 README
                            </button>
                            <button
                                className={`tab-button ${
                                    activeTab === "languages" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("languages")}
                            >
                                📊 Languages
                            </button>
                            <button
                                className={`tab-button ${
                                    activeTab === "contributors" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("contributors")}
                            >
                                👥 Contributors
                            </button>
                            <div className="github-tab-buttons">
                                <a
                                    href={repository.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tab-button github-link"
                                >
                                    🔗 GitHub
                                </a>
                                <a
                                    href={repository.live_demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="tab-button github-link"
                                >
                                    🔗 Live Demo
                                </a>
                            </div>
                        </div>

                        <div className="modal-content">
                            {renderTabContent()}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RepositoryModal;
