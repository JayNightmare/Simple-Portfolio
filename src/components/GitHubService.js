import axios from "axios";

class GitHubService {
    constructor() {
        this.cache = {
            repos: null,
            user: null,
            orgs: null,
            timestamp: null,
        };
        this.CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
    }

    isCacheValid() {
        return (
            this.cache.timestamp &&
            Date.now() - this.cache.timestamp < this.CACHE_DURATION
        );
    }

    async fetchUserData() {
        if (this.isCacheValid() && this.cache.user) {
            return this.cache.user;
        }

        try {
            const response = await axios.get(
                "https://api.github.com/users/JayNightmare"
            );
            this.cache.user = response.data;
            this.cache.timestamp = Date.now();
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    }

    async fetchRepositories() {
        if (this.isCacheValid() && this.cache.repos) {
            return this.cache.repos;
        }

        try {
            const [userRepos, nexusRepos, augmentedRepos] = await Promise.all([
                axios.get(
                    "https://api.github.com/users/JayNightmare/repos?per_page=100"
                ),
                axios.get(
                    "https://api.github.com/orgs/Nexus-Scripture/repos?per_page=100"
                ),
                axios.get(
                    "https://api.github.com/orgs/Augmented-Perception/repos?per_page=100"
                ),
            ]);

            const allRepos = [
                ...userRepos.data,
                ...nexusRepos.data,
                ...augmentedRepos.data,
            ];

            // Filter out forks and sort by stars and updated date
            const filteredRepos = allRepos
                .filter((repo) => !repo.fork)
                .sort((a, b) => {
                    // Sort by stars first, then by updated date
                    if (b.stargazers_count !== a.stargazers_count) {
                        return b.stargazers_count - a.stargazers_count;
                    }
                    return new Date(b.updated_at) - new Date(a.updated_at);
                });

            this.cache.repos = filteredRepos;
            this.cache.timestamp = Date.now();
            return filteredRepos;
        } catch (error) {
            console.error("Error fetching repositories:", error);
            return [];
        }
    }

    async fetchOrganizations() {
        if (this.isCacheValid() && this.cache.orgs) {
            return this.cache.orgs;
        }

        try {
            const response = await axios.get(
                "https://api.github.com/users/JayNightmare/orgs"
            );
            this.cache.orgs = response.data;
            this.cache.timestamp = Date.now();
            return response.data;
        } catch (error) {
            console.error("Error fetching organizations:", error);
            return [];
        }
    }

    groupReposByLanguage(repos) {
        const languageGroups = {};

        repos.forEach((repo) => {
            const language = repo.language || "Other";
            if (!languageGroups[language]) {
                languageGroups[language] = [];
            }
            languageGroups[language].push(repo);
        });

        return languageGroups;
    }

    getFeaturedProjects(repos, count = 6) {
        return repos
            .filter((repo) => repo.stargazers_count > 0 || repo.description)
            .slice(0, count);
    }
}

const gitHubService = new GitHubService();
export default gitHubService;
