import React from "react";
import "../styles/PersonalInfo.css";

const PersonalInfo = ({ userData }) => {
    const socialLinks = [
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/jordan-s-bell",
            icon: "💼",
            color: "#0077B5",
        },
        {
            name: "GitHub",
            url: "https://github.com/JayNightmare",
            icon: "💻",
            color: "#333",
        },
        {
            name: "Discord",
            url: "https://discord.com/users/373097473553727488",
            icon: "🎮",
            color: "#5865F2",
        },
    ];

    const userProfilePicture = (
        <img
            src="https://avatars.githubusercontent.com/u/34739807?v=4"
            alt="Jay's Profile"
            className="profile-image"
        />
    );

    return (
        <section id="about" className="personal-info">
            <div className="personal-info-container">
                <div className="profile-section">
                    <div className="profile-image-container">
                        {userProfilePicture}
                    </div>
                    <div className="profile-details">
                        <h1>Jay</h1>
                        <h2>Full Stack Developer</h2>
                        {userData && (
                            <div className="github-stats">
                                <p className="bio">
                                    {userData.bio ||
                                        "Passionate developer creating innovative solutions"}
                                </p>
                                <div className="stats">
                                    <span className="stat">
                                        <strong>{userData.public_repos}</strong>{" "}
                                        Repositories
                                    </span>
                                    <span className="stat">
                                        <strong>{userData.followers}</strong>{" "}
                                        Followers
                                    </span>
                                    <span className="stat">
                                        <strong>{userData.following}</strong>{" "}
                                        Following
                                    </span>
                                </div>
                                {userData.location && (
                                    <p className="location">
                                        📍 {userData.location}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="social-links">
                    <h3>Connect with me</h3>
                    <div className="social-cards">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-card"
                                style={{ borderColor: link.color }}
                            >
                                <span className="social-icon">{link.icon}</span>
                                <span className="social-name">{link.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalInfo;
