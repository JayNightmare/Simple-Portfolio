# Jay's Portfolio Website

A modern, responsive portfolio website built with React that showcases my GitHub projects and personal work. The site automatically fetches and caches data from GitHub APIs to display my repositories, technologies, and development activity.

## 🌟 Features

- **Automatic GitHub Integration**: Fetches repositories from personal GitHub account and organizations (Nexus-Scripture, Augmented-Perception)
- **Smart Caching**: 30-minute cache system to optimize API calls and improve performance
- **Language Grouping**: Projects automatically grouped by programming language with visual cards
- **Featured Projects**: Highlights top repositories based on stars and activity
- **Responsive Design**: Fully responsive layout that works on all devices
- **Social Links**: Quick navigation to LinkedIn, GitHub, and Discord profiles
- **Modern UI**: Glass morphism effects, smooth animations, and gradient backgrounds

## 🛠️ Technologies Used

- **React** - Frontend framework
- **JavaScript** - Programming language
- **CSS3** - Styling with modern features (backdrop-filter, gradients, grid)
- **Axios** - HTTP client for GitHub API calls
- **GitHub APIs** - Data source for repositories and user information
- **GitHub Pages** - Hosting platform

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JayNightmare/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── GitHubService.js      # GitHub API integration and caching
│   ├── PersonalInfo.js       # Profile section with social links
│   ├── PersonalInfo.css
│   ├── LanguageCards.js      # Technology/language grouping
│   └── LanguageCards.css
├── App.js                    # Main application component
├── App.css                   # Global styles
├── NavBar.js                 # Navigation component
├── NavBar.css
├── FeaturedProjects.js       # Highlighted repositories
├── FeaturedProjects.css
├── FuturePlans.js           # Goals and future plans
├── FuturePlans.css
└── index.js                 # Application entry point
```

## 🔧 Configuration

### GitHub API Rate Limits
The application uses public GitHub APIs with a 30-minute caching system to respect rate limits. For higher rate limits, you can:

1. Add a GitHub personal access token (optional)
2. Modify the GitHubService.js file to include authentication

### Customization
To customize for your own portfolio:

1. Update the GitHub username and organizations in `GitHubService.js`
2. Modify social links in `PersonalInfo.js` and `NavBar.js`
3. Update personal information and future plans
4. Replace the placeholder profile image

## 🌐 Deployment

### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Custom Domain
This project is configured for the custom domain `portfolio.endpoint-system.uk`. To use your own:

1. Update the `homepage` field in `package.json`
2. Modify the `CNAME` file in the `public` folder
3. Configure your DNS settings to point to GitHub Pages

## 📊 GitHub API Integration

The portfolio automatically fetches:
- User profile information
- Public repositories from personal account
- Repositories from specified organizations
- Repository statistics (stars, forks, languages)
- Recent activity and update dates

### Organizations Included:
- **Nexus-Scripture** - Scripture and religious text projects
- **Augmented-Perception** - AR/VR and perception-related projects

## 🎨 Design Features

- **Gradient Backgrounds**: Modern purple-blue gradients
- **Glass Morphism**: Translucent cards with backdrop blur
- **Responsive Grid**: Flexible layouts for all screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Focus states and semantic HTML
- **Performance**: Optimized loading and caching

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 Caching Strategy

The application implements a smart caching system:
- **Cache Duration**: 30 minutes
- **Cached Data**: User profile, repositories, organizations
- **Cache Invalidation**: Automatic after expiration
- **Fallback**: Graceful degradation if API fails

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Site**: [portfolio.endpoint-system.uk](https://portfolio.endpoint-system.uk)
- **GitHub**: [JayNightmare](https://github.com/JayNightmare)
- **LinkedIn**: [jordan-s-bell](https://linkedin.com/in/jordan-s-bell)

## 🛠️ Future Enhancements

- [ ] Add blog section with markdown support
- [ ] Implement dark/light theme toggle
- [ ] Add project filtering and search
- [ ] Include contribution graph visualization
- [ ] Add contact form with email integration
- [ ] Implement lazy loading for images
- [ ] Add analytics and visitor tracking

---

Built with ❤️ by Jay using React and modern web technologies.

## Available Scripts (Create React App)

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run deploy`
Builds and deploys the app to GitHub Pages.
