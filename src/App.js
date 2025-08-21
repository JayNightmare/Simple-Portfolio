import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import NavBar from "./components/NavBar";
import PersonalInfo from "./components/PersonalInfo";
import LanguageCards from "./components/LanguageCards";
import FeaturedProjects from "./components/FeaturedProjects";
import FuturePlans from "./components/FuturePlans";
import GitHubService from "./components/GitHubService";
import "./styles/App.css";

function AppContent() {
    const [userData, setUserData] = useState(null);
    const [languageGroups, setLanguageGroups] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Load user data and repositories in parallel
                const [user, repos] = await Promise.all([
                    GitHubService.fetchUserData(),
                    GitHubService.fetchRepositories(),
                ]);

                setUserData(user);

                // Group repositories by language
                const grouped = GitHubService.groupReposByLanguage(repos);
                setLanguageGroups(grouped);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="App">
                <NavBar />
                <div className="loading-screen">
                    <h1>Loading Portfolio...</h1>
                    <p>Fetching data from GitHub...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <NavBar />
            <PersonalInfo userData={userData} />
            <LanguageCards languageGroups={languageGroups} />
            <FeaturedProjects />
            <FuturePlans />
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
