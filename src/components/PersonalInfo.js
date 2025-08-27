import React, { useState, useEffect } from "react";
import "../styles/PersonalInfo.css";
import discordIcon from "../assets/svg/discord-svgrepo-com.svg";
import linkedInIcon from "../assets/svg/linkedin-svgrepo-com.svg";
import githubIcon from "../assets/svg/github-142-svgrepo-com.svg";

const PersonalInfo = ({ userData }) => {
    const [orgData, setOrgData] = useState(null);

    const socialLinks = [
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/jordan-s-bell",
            icon: linkedInIcon,
            color: "#0077B5",
        },
        {
            name: "GitHub",
            url: "https://github.com/JayNightmare",
            icon: githubIcon,
            color: "#999999ff",
        },
        {
            name: "Discord",
            url: "https://discord.com/users/373097473553727488",
            icon: discordIcon,
            color: "#5865F2",
        },
    ];

    useEffect(() => {
        if (userData && userData.organizations_url) {
            fetch(userData.organizations_url)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.length > 0) {
                        setOrgData(data); // Set all organizations
                    }
                })
                .catch((error) => {
                    console.error("Error fetching organization data:", error);
                });
        }
    }, [userData]);

    const orgProfilePictures =
        orgData && orgData.length > 0
            ? orgData.map((org, index) => (
                  <a
                      className="org-button"
                      key={index}
                      href={`https://github.com/${org.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      <img
                          src={org.avatar_url}
                          alt={`${org.login} logo`}
                          className="org-icon"
                          width="32"
                          height="32"
                      />
                  </a>
              ))
            : null;

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
                                <div className="orgsInfo">
                                    <p className="orgsInfoTitle">
                                        Organisations:
                                    </p>
                                    <div className="org-icon-container">
                                        {orgProfilePictures}
                                    </div>
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
                                <img
                                    className="social-icon"
                                    src={link.icon}
                                    alt={link.name}
                                    width={32}
                                    height={32}
                                    style={{
                                        filter: "brightness(0) invert(1)",
                                    }}
                                />
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
