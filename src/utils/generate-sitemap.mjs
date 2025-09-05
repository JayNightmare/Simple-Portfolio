import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSitemap = () => {
    const baseUrl = "https://jaynightmare.github.io/Simple-Portfolio";
    const currentDate = new Date().toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;

    // Write sitemap to the build directory
    const buildDir = path.resolve(__dirname, "../../build");

    if (!fs.existsSync(buildDir)) {
        console.error(
            "Build directory does not exist. Make sure to run this after building the app."
        );
        process.exit(1);
    }

    fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
    console.log("Sitemap generated successfully!");
};

generateSitemap();
