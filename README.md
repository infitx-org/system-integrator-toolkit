# System Integrator (SI) Toolkit Documentation

[![Deploy Docs](https://github.com/infitx-org/participation-tool-docs/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/infitx-org/participation-tool-docs/actions/workflows/deploy-docs.yml)

A comprehensive documentation toolkit for Mojaloop system integrators, covering business integration, technical implementation, payment manager guides, and deployment strategies.

## 📖 Documentation Structure

The documentation is organized into role-based sections:

- **🚀 Getting Started** - Introduction and overview for all stakeholders
- **💼 Business Integration** - Business operations, payment flows, and commercial guidance
- **🔧 Technical Integration** - Technical implementation guides and architecture
- **📊 Payment Manager Guide** - User guides for PM4ML operations and monitoring
- **🚀 Deployment Guide** - Step-by-step deployment and configuration instructions
- **📚 Technical Reference** - API documentation, patterns, and advanced configurations

## 🛠 Technology Stack

This documentation is built using:

- **[VuePress 2.0](https://v2.vuepress.vuejs.org/)** - Vue-powered static site generator
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[GitHub Pages](https://pages.github.com/)** - Automated deployment and hosting
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline

## 🏗 Getting Started with Development

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** for version control

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/infitx-org/participation-tool-docs.git
   cd participation-tool-docs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run docs:dev
   ```
   
   The site will be available at `http://localhost:8080/system-integrator-toolkit/`

4. **Build for production**
   ```bash
   npm run docs:build
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run docs:dev` | Start development server with hot reload |
| `npm run docs:build` | Build static site for production |
| `npm run docs:clean-dev` | Start dev server with clean cache |
| `npm run docs:update-package` | Update VuePress dependencies |

## 📝 Documentation Guidelines

### File Structure

```
├── .vuepress/               # VuePress configuration
│   ├── config.js           # Main configuration file
│   ├── public/             # Static assets
│   └── styles/             # Custom CSS styles
├── getting-started/         # Getting started guides
├── business-integration/    # Business-focused documentation
├── technical-integration/   # Technical implementation guides
├── payment-manager-guide/   # PM4ML user guides
├── deployment-guide/        # Deployment and configuration
├── technical-reference/     # API docs and advanced patterns
└── images/                 # Shared images and diagrams
```

### Content Organization

#### Directory-Based Navigation
Each main section has its own directory with:
- `README.md` - Section overview and navigation
- Individual `.md` files for specific topics
- `images/` or subdirectories for assets

#### Sidebar Configuration
Navigation is configured in `.vuepress/config.js`:
- Each section has its own sidebar configuration
- Files are organized into logical groups
- Non-collapsible sections for better UX

### Writing Guidelines

#### Markdown Standards
- Use **H1** (`#`) only for main page titles
- Use **H2** (`##`) for major sections
- Use **H3** (`###`) for subsections
- Include a brief introduction for each page

#### Image Management
- Store images in `/images/` directory for VuePress compatibility
- Use descriptive filenames: `payment-flow-diagram.png`
- Reference images with absolute paths: `![Description](/images/filename.png)`
- Optimize images for web (< 500KB recommended)

#### Cross-References
- Use relative paths for internal links: `[Link Text](./filename.md)`
- Use absolute paths for cross-section links: `[Link Text](/section/filename.md)`
- Include anchor links for deep linking: `[Link Text](./filename.md#section-name)`

#### Code Examples
- Use appropriate language tags for syntax highlighting
- Include complete, runnable examples where possible
- Provide context and explanation for code snippets

### Adding New Content

#### 1. Create New Pages
```bash
# Create new markdown file
touch section-name/new-topic.md

# Add content with proper frontmatter
echo "# New Topic

Description of the new topic...
" > section-name/new-topic.md
```

#### 2. Update Navigation
Edit `.vuepress/config.js` to add the new page to the appropriate sidebar:

```javascript
'/section-name/': [
  {
    text: 'Section Name',
    collapsible: false,
    children: [
      'existing-page.md',
      'new-topic.md',  // Add new page here
    ]
  }
]
```

#### 3. Update Section README
Add references to new content in the section's `README.md` file.

### Content Review Process

1. **Technical Accuracy** - Ensure all code examples and procedures work
2. **Clarity** - Write for your target audience (business vs. technical)
3. **Completeness** - Include prerequisites, steps, and expected outcomes
4. **Links** - Verify all internal and external links work
5. **Images** - Ensure images display correctly and add value

## 🚀 GitHub Workflow & Deployment

### Automated Deployment Pipeline

The documentation is automatically built and deployed using GitHub Actions when changes are pushed to the `main` branch.

#### Workflow Overview (`deploy-docs.yml`)

```yaml
Trigger: Push to main branch
├── Build Job (ubuntu-latest)
│   ├── Checkout code
│   ├── Setup Node.js 20
│   ├── Install dependencies (npm ci)
│   ├── Build documentation (npm run docs:build)
│   ├── Create .nojekyll file
│   └── Upload build artifacts
└── Deploy Job
    ├── Deploy to GitHub Pages
    └── Update live site
```

#### Build Process Details

1. **Environment Setup**
   - Ubuntu latest runner
   - Node.js 20.x
   - Clean npm install (`npm ci`)

2. **Build Execution**
   - VuePress builds static site to `.vuepress/dist/`
   - `.nojekyll` file prevents Jekyll processing
   - Artifacts uploaded for deployment

3. **Deployment**
   - GitHub Pages deployment action
   - Automatic URL generation
   - Live site updates within minutes

### Branch Strategy

- **`main`** - Production branch, auto-deploys to GitHub Pages
- **Feature branches** - Development work, create PRs to main
- **`PM4MLGuide`** - Current development branch (will merge to main)

### Making Changes

#### For Contributors

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-content
   ```

2. **Make changes and test locally**
   ```bash
   npm run docs:dev
   # Verify changes at http://localhost:8080/system-integrator-toolkit/
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Add new content: [description]"
   git push origin feature/new-content
   ```

4. **Create Pull Request**
   - Target: `main` branch
   - Include description of changes
   - Request review from maintainers

#### For Maintainers

1. **Review PRs** for content quality and accuracy
2. **Test changes** locally if needed
3. **Merge to main** triggers automatic deployment
4. **Monitor deployment** in Actions tab

### Deployment Monitoring

- **GitHub Actions Tab**: Monitor build and deploy status
- **Live Site**: Changes appear at the GitHub Pages URL within 5-10 minutes
- **Build Logs**: Debug any deployment issues in the Actions logs

### Troubleshooting Deployment

#### Common Issues

1. **Build Failures**
   - Check syntax in markdown files
   - Verify image paths are correct
   - Ensure config.js syntax is valid

2. **Missing Images**
   - Confirm images are in `/images/` directory
   - Check image references use `/images/` not `./images/`
   - Verify file names match exactly (case-sensitive)

3. **Broken Links**
   - Update internal links when moving files
   - Check cross-references between sections
   - Use VuePress development server warnings as guide

#### Debug Steps

```bash
# 1. Test locally
npm run docs:dev

# 2. Clean build test
npm run docs:build

# 3. Check build output
ls -la .vuepress/dist/

# 4. Verify configuration
node -c .vuepress/config.js
```

## 🤝 Contributing

### Content Contributions

We welcome contributions from:
- **Subject Matter Experts** - Domain knowledge and best practices
- **Technical Writers** - Content clarity and organization
- **Developers** - Code examples and technical accuracy
- **Community Members** - Feedback and improvements

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
3. **Add or improve content**
4. **Test changes locally**
5. **Submit a pull request**

### Content Standards

- Follow the writing guidelines above
- Ensure accuracy of technical content
- Include appropriate diagrams and examples
- Test all procedures and code samples
- Maintain consistent tone and style

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Community discussions and Q&A
- **Documentation**: This README and inline documentation

---

**Live Documentation**: The latest version is always available at the GitHub Pages URL generated by the deployment workflow.