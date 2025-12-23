# Sunday New Tab - Chrome Extension

A beautiful, customizable Chrome new tab page featuring an elegant time display, daily quotes, and quick access shortcuts to your favorite AI tools and websites.

![Sunday New Tab Preview](assets/preview.png)

## Features

✨ **Beautiful Design**
- Modern dark theme with vibrant neon accents
- Smooth animations and responsive layout
- Shows current time in large, glowing numbers
- Displays day of week and full date

💬 **Daily Motivational Quotes**
- Displays an inspirational quote on each new tab
- Features various attributed quotes to inspire productivity
- Perfect for daily motivation

🔗 **Quick Shortcuts**
- 8 customizable shortcut buttons (left and right sides)
- Quickly access your favorite AI tools (ChatGPT, Gemini, Claude, etc.)
- Easy drag-and-drop organization (editable URLs)
- Smooth hover effects and visual feedback

🎨 **Interactive UI Components**
- Built with React and TypeScript for robustness
- Radix UI component library for accessibility
- Tailwind CSS for styling
- Smooth transitions and animations

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── AIRevolver.tsx          # Main component
│   │   ├── figma/                  # Figma design components
│   │   └── ui/                     # Reusable UI components
│   ├── styles/                     # Global styles
│   ├── App.tsx                     # Root app component
│   └── main.tsx                    # Entry point
├── newtab.html                     # New tab page HTML (vanilla)
├── manifest.json                   # Chrome extension manifest
├── package.json                    # Dependencies
└── vite.config.ts                  # Build configuration
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Chrome browser

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build
   ```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

### Development

Run the development server:
```bash
npm run dev
```

This starts Vite's development server with hot module replacement.

## Built With

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Radix UI** - Unstyled, accessible components
- **Tailwind CSS** - Utility-first CSS framework
- **Sonner** - Toast notifications

## Configuration

### Adding Shortcuts

Edit the shortcuts in the extension. Each shortcut can be customized with:
- URL (the link to open)
- Label (display name)
- Icon (visual indicator)

### Customizing Quotes

Quotes are managed in the JavaScript files. You can add your own quotes or connect to an external API.

## Original Design

The React components are based on the original design from:
[Interactive AI Tool Revolver - Figma Design](https://www.figma.com/design/1Ck8rsxCB5MoiclZdTKVBP/Interactive-AI-Tool-Revolver)

## Browser Compatibility

- ✅ Chrome/Chromium-based browsers
- ✅ Chrome 88+

## License

This project is provided as-is for personal use.

## Contributing

Feel free to fork, modify, and improve this extension for your personal use!

## Tips

- **Custom Quotes**: Update the quote data in your component to display your favorite motivational messages
- **Icon Customization**: Replace or add new icons in the assets folder
- **Color Scheme**: Modify the Tailwind configuration or CSS to change the color theme
- **Time Format**: Adjust the time display format in the component preferences

---

Enjoy your personalized Chrome new tab experience! 🚀
