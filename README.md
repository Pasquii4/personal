# 💼 PAU PASCUAL - FinTech Developer Portfolio

Professional portfolio website with Bloomberg Terminal aesthetics, featuring real-time market data visualization and modern web technologies.

![Portfolio Preview](assets/img/avatar.png)

## 🚀 Features

- **Bloomberg Terminal Design**: Dark, professional UI inspired by trading terminals
- **Real-Time Data**: Live market indices with auto-updating charts
- **Interactive Charts**: Canvas-based mini charts for market and tech data
- **GitHub Integration**: Automatic repository stats and language statistics
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Smooth Animations**: Professional scroll animations and transitions
- **SEO Optimized**: Meta tags and semantic HTML for better visibility

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript**: ES6+ with modular architecture
- **APIs**: GitHub API for live statistics
- **Fonts**: Google Fonts (Space Grotesk, JetBrains Mono, Inter)

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # Complete stylesheet
│   ├── js/
│   │   └── main.js        # JavaScript functionality
│   └── img/
│       └── avatar.png     # Profile image
├── CV_2.0.pdf             # Resume/CV
└── README.md              # This file
```

## 🎨 Color Palette

```css
--bg-primary: #0a0e27       /* Dark blue background */
--bg-secondary: #131929     /* Secondary background */
--bg-card: #1a1f3a          /* Card background */
--accent-green: #00ff88     /* Positive/primary accent */
--accent-red: #ff4757       /* Negative accent */
--accent-blue: #2e86de      /* Secondary accent */
--accent-gold: #ffd700      /* Highlight accent */
```

## 📊 Sections

1. **Market Overview**: Real-time simulated market data with mini charts
2. **Profile Card**: Personal information and social links
3. **Technology Portfolio**: Skills represented as market positions
4. **Trading Desk**: Projects displayed as trading positions
5. **Market Sentiment**: Tech trends visualization
6. **Company Profile**: Professional background and vision
7. **Live Metrics**: GitHub activity statistics
8. **Contact**: Multiple ways to get in touch

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pasquii4/personal.git
   cd personal
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Or using Node.js
     npx http-server
     ```

3. **Access the site**
   - Navigate to `http://localhost:8000`

### GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: `main` branch, `/ (root)` folder
   - Click Save

3. **Access your live site**
   - Wait 1-2 minutes for deployment
   - Visit `https://pasquii4.github.io/personal/`

## ⚙️ Configuration

### GitHub Username

Edit in `assets/js/main.js`:

```javascript
const CONFIG = {
    GITHUB_USERNAME: 'Pasquii4', // Change to your username
    UPDATE_INTERVAL: 60000,
    // ...
};
```

### API Keys (Optional)

For real financial data, add API keys:

```javascript
API_KEYS: {
    ALPHA_VANTAGE: 'your-key-here',
    FINNHUB: 'your-key-here'
}
```

Get free keys:
- [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
- [Finnhub](https://finnhub.io/register)

### Personal Information

Update in `index.html`:
- Name, title, location
- Contact information
- Social media links
- Project descriptions

### Profile Image

Replace `assets/img/avatar.png` with your photo:
- Recommended: 500x500px
- Format: PNG or JPG
- Circular crop works best

## 🎯 Performance

- **Load Time**: < 3 seconds on 3G
- **First Contentful Paint**: < 1.5s
- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: ~50KB (uncompressed)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Change Color Scheme

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --accent-green: #your-color;
    --bg-primary: #your-background;
    /* ... */
}
```

### Add Projects

Add new project cards in the Trading Desk section of `index.html`:

```html
<div class="trade-card active">
    <!-- Project content -->
</div>
```

### Modify Tech Stack

Update the Technology Portfolio section with your skills.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- **Email**: pascualpau04@gmail.com
- **LinkedIn**: [pau-pascual-vallverdu](https://www.linkedin.com/in/pau-pascual-vallverdu/)
- **GitHub**: [Pasquii4](https://github.com/Pasquii4)
- **Location**: Barcelona, Spain

## 🙏 Acknowledgments

- Design inspired by Bloomberg Terminal
- Icons from inline SVG
- Fonts from Google Fonts

---

**Built with passion for FinTech** 💚

*Last updated: February 2026*
