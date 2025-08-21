import React from "react";
import "../styles/FuturePlans.css";

const FuturePlans = () => {
    const futurePlans = [
        {
            category: "Technical Skills",
            icon: "🚀",
            plans: [
                "Master advanced React patterns and Next.js for full-stack development",
                "Explore AI/ML integration with TensorFlow.js and Python",
                "Dive deeper into cloud architecture with AWS and Azure",
                "Learn Rust for system programming and performance optimization",
            ],
        },
        {
            category: "Projects",
            icon: "💡",
            plans: [
                "Build an open-source developer tools suite",
                "Create an AI-powered code review assistant",
                "Develop a real-time collaboration platform",
                "Launch a mobile app using React Native",
            ],
        },
        {
            category: "Community",
            icon: "🤝",
            plans: [
                "Contribute to major open-source projects",
                "Start a tech blog sharing development insights",
                "Mentor new developers through coding bootcamps",
                "Organize local developer meetups and workshops",
            ],
        },
        {
            category: "Career Growth",
            icon: "📈",
            plans: [
                "Lead a development team on innovative projects",
                "Obtain cloud architecture certifications",
                "Speak at tech conferences about modern development",
                "Start a tech consultancy focused on scalable solutions",
            ],
        },
    ];

    return (
        <section id="future" className="future-plans">
            <div className="container">
                <h2>Future Plans & Goals</h2>
                <p className="section-subtitle">
                    Here's what I'm working towards and excited to achieve in my
                    development journey
                </p>

                <div className="plans-grid">
                    {futurePlans.map((category, index) => (
                        <div key={index} className="plan-category">
                            <div className="category-header">
                                <span className="category-icon">
                                    {category.icon}
                                </span>
                                <h3>{category.category}</h3>
                            </div>
                            <ul className="plans-list">
                                {category.plans.map((plan, planIndex) => (
                                    <li key={planIndex} className="plan-item">
                                        {plan}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="cta-section">
                    <h3>Let's Build Something Amazing Together!</h3>
                    <p>
                        I'm always excited to collaborate on innovative projects
                        and explore new technologies. Whether you have an idea,
                        need development expertise, or just want to chat about
                        tech, feel free to reach out!
                    </p>
                    <div className="cta-buttons">
                        <a
                            href="https://linkedin.com/in/jordan-s-bell"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button primary"
                        >
                            Connect on LinkedIn
                        </a>
                        <a
                            href="https://github.com/JayNightmare"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button secondary"
                        >
                            Follow on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FuturePlans;
