import React, { useState, useEffect } from "react";
import GitHubService from "./GitHubService";
import RepositoryModal from "./RepositoryModal";
import "../styles/FeaturedProjects.css";

const FeaturedProjects = () => {
    const [featuredRepos, setFeaturedRepos] = useState([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const loadFeaturedProjects = async () => {
            try {
                const repos = await GitHubService.fetchRepositories();
                const featured = GitHubService.getFeaturedProjects(repos, 6);
                setFeaturedRepos(featured);
            } catch (error) {
                console.error("Error loading featured projects:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFeaturedProjects();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
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
            Other: "#6f42c1",
        };
        return colors[language] || "#6c757d";
    };

    if (loading) {
        return (
            <section className="featured-projects">
                <div className="container">
                    <h2>Featured Projects</h2>
                    <div className="loading">Loading projects...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="featured-projects">
            <div className="container">
                <h2>Featured Projects</h2>
                <div className="projects-grid">
                    {featuredRepos.map((repo) => (
                        <div key={repo.id} className="project-card">
                            <div className="project-header">
                                <h3 className="project-title">
                                    <button
                                        onClick={() =>
                                            handleRepositoryClick(repo)
                                        }
                                        className="project-title-button"
                                        type="button"
                                    >
                                        {repo.name}
                                    </button>
                                </h3>
                                {repo.language && (
                                    <span
                                        className="language-tag"
                                        style={{
                                            backgroundColor: getLanguageColor(
                                                repo.language
                                            ),
                                        }}
                                    >
                                        {repo.language}
                                    </span>
                                )}
                            </div>

                            <p className="project-description">
                                {repo.description || "No description available"}
                            </p>

                            <div className="project-stats">
                                <div className="stat-group">
                                    {repo.stargazers_count > 0 && (
                                        <span className="stat">
                                            ⭐ {repo.stargazers_count}
                                        </span>
                                    )}
                                    {repo.forks_count > 0 && (
                                        <span className="stat">
                                            🍴 {repo.forks_count}
                                        </span>
                                    )}
                                </div>
                                <span className="updated-date">
                                    Updated {formatDate(repo.updated_at)}
                                </span>
                            </div>

                            <div className="project-links">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link primary"
                                >
                                    View on GitHub
                                </a>
                                {repo.homepage && (
                                    <a
                                        href={repo.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link secondary"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="view-more">
                    <a
                        href="https://github.com/JayNightmare"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-more-link"
                    >
                        View All Projects on GitHub →
                    </a>
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

export default FeaturedProjects;
