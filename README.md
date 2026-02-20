# Edu Games Academy - Product Showcase

This is the main showcase website for Edu Games Academy, featuring all educational games created by our organization.

## Features

- 🎓 **Modern Educational Theme**: Beautiful, engaging design focused on learning
- 🎮 **Product Carousel**: Interactive stacked carousel displaying screenshots of our games
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🤖 **Automated Updates**: GitHub Action automatically fetches and updates products daily

## Sections

1. **Introduction**: Overview of Edu Games Academy and our mission
2. **Product Carousel**: Showcases all our educational games with screenshots
3. **Contact**: Ways to get in touch and contribute

## How It Works

The website automatically discovers and showcases all repositories in the Edu-Games-Academy organization that have GitHub Pages enabled (repos with a `gh-pages` branch).

### Automated Updates

A GitHub Action runs daily to:
1. Fetch all repositories from the Edu-Games-Academy organization
2. Identify repos with GitHub Pages (`gh-pages` branch)
3. Take screenshots of each GitHub Pages site (1920x1080 resolution)
4. Update the `products.json` file with the latest information
5. Commit and push changes automatically

### Manual Update

You can manually trigger the workflow from the Actions tab or by running:
```bash
# Trigger via GitHub CLI
gh workflow run update-products.yml
```

## Local Development

To run the website locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Edu-Games-Academy/edu-games-academy.github.io.git
   cd edu-games-academy.github.io
   ```

2. Start a local web server:
   ```bash
   python3 -m http.server 8080
   ```

3. Open your browser to `http://localhost:8080`

## File Structure

```
.
├── index.html              # Main HTML file
├── styles.css              # Styling for the showcase
├── script.js               # Carousel functionality
├── products.json           # Auto-generated list of products
├── screenshots/            # Auto-generated screenshots
├── .github/
│   └── workflows/
│       └── update-products.yml  # GitHub Action workflow
└── README.md
```

## Technologies Used

- **Frontend**: Pure HTML, CSS, and JavaScript (no frameworks)
- **Automation**: Python with Selenium for screenshots
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## Contributing

We welcome contributions! Feel free to:
- Add new educational games to the organization
- Improve the showcase website design
- Report bugs or suggest features

Visit our [GitHub Organization](https://github.com/Edu-Games-Academy) to get started!

## License

© 2026 Edu Games Academy. All rights reserved.
