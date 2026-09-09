# Spider-Man Holographic Display System 🕷️

A **cinema-quality 3D holographic simulator** inspired by Tony Stark's holographic technology from Spider-Man: Far From Home. Fully interactive with smooth suit transitions, web shooter configurations, and particle effects.

## 🎬 Features

### **4 Suit Designs with Smooth Transitions**
- **STARK SUIT** - Blue & Red (Default) - Tony's advanced tech suit
- **HOMEMADE SUIT** - Red & Blue street style - Peter's original creation
- **STEALTH SUIT** - Dark green with neon accents - Covert operations
- **IRON SPIDER SUIT** - Gold & Red armor - Advanced nano-tech suit

Each suit transitions smoothly with **holographic flash effects** and realistic color shifting animations.

### **4 Web Shooter Configurations**
- **STANDARD** - Classic cyan web fluid (60 min dissolve)
- **IMPACT** - Heavy-duty red webbing (90 min dissolve)
- **RICOCHET** - Low-viscosity green formula (30 min dissolve)
- **EXPLOSIVE** - High-charge yellow web (120 min dissolve)

Web shooters glow and change color with smooth transitions!

### **Interactive Features**
✨ **3D Holographic Model** - Realistic Spider-Man figure with dynamic lighting
✨ **Particle System** - Authentic hologram shimmer effect
✨ **Multiple Poses** - Idle, Wall-crawling, Web-shooting, Flying animations
✨ **Live Fluid Analysis** - Real-time display of web fluid properties
✨ **Movie-Accurate UI** - Professional control panel with corner markers
✨ **Glowing Effects** - Dynamic emissive materials and neon aesthetics
✨ **Smooth Animations** - 600ms transitions with holographic flash effects

## 🎮 Controls

**Hologram Interaction:**
- 🖱️ **Drag** - Rotate the hologram
- 🔍 **Scroll** - Zoom in/out
- Click anywhere to inspect details

**Control Panel:**
- **SUIT DESIGNS** - Click to switch between 4 Spider-Man suits
- **WEB SHOOTER CONFIG** - Select web fluid type and see properties
- **DISPLAY OPTIONS:**
  - POSE - Cycle through animation poses
  - PARTICLES - Toggle holographic particle effects
  - ROTATE - Pause/resume auto-rotation
- **INTENSITY** - Adjust holographic glow intensity (30%-200%)

**Real-Time Data:**
- Live FPS counter
- Signal strength indicator
- Web fluid analysis (Type, Viscosity, Dissolve Time)

## 🚀 Quick Start

### **Option 1: Online**
Simply open `index.html` in your browser!

### **Option 2: Clone Repository**
```bash
git clone https://github.com/25mhenry-alt/spiderman-hologram.git
cd spiderman-hologram
# Open index.html in your browser
```

### **Option 3: Download**
1. Click the green "Code" button
2. Select "Download ZIP"
3. Extract and open `index.html`

## 🛠️ Technologies Used

- **Three.js** (r128) - 3D graphics and rendering
- **HTML5/CSS3** - Structure and styling
- **JavaScript (ES6+)** - Interactive controls and animations
- **WebGL** - Hardware-accelerated 3D graphics

## 📱 Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Any browser with WebGL 2.0 support

## 🎨 Customization

Want to modify the hologram? Edit `hologram.js`:

```javascript
// Change suit colors
const suitConfigs = {
    stark: {
        bodyColor: 0x0055ff,      // Suit color
        accentColor: 0xff0000,    // Logo color
        metalness: 0.5,           // Reflectivity
        roughness: 0.4            // Surface texture
    }
};

// Add more web types
const webConfigs = {
    custom: {
        name: 'Custom Web',
        viscosity: 'Custom',
        dissolveTime: '45 minutes',
        color: 0x00ff00,           // Web color
        emission: 0x00ffff         // Glow color
    }
};
```

## 📊 Project Structure

```
spiderman-hologram/
├── index.html          # Main HTML file
├── styles.css          # Holographic UI styling
├── hologram.js         # 3D scene & logic
└── README.md          # This file
```

## ✨ Key Features Breakdown

### **Smooth Suit Transitions**
- 600ms animated color shifts
- Holographic flash effects during transitions
- Real-time suit indicator updates

### **Web Shooter System**
- Dynamic web line colors
- Real-time web fluid properties
- 400ms smooth transitions between formulas

### **Holographic Effects**
- Pulsing glow aura
- Particle system shimmer
- Scan line overlay animation
- Corner marker indicators
- Dynamic lighting that breathes

### **3D Model**
- Head with glowing eyes
- Torso with spider logo
- Arms with web shooter
- Legs with realistic proportions
- Dynamic web lines

## 🎬 Movie Accuracy

This simulator captures the essence of Tony Stark's holographic tech from Far From Home:
- Clean, minimal interface design
- Neon cyan color scheme (#00d4ff)
- Corner markers and grid overlay
- Real-time data display
- Smooth, responsive animations
- Professional aesthetics

## 🐛 Troubleshooting

**Hologram not showing?**
- Make sure JavaScript is enabled
- Check browser console for errors
- Try a different browser

**Performance issues?**
- Lower the intensity slider
- Disable particle effects
- Close other browser tabs

**WebGL not supported?**
- Update your browser
- Try Chrome or Firefox
- Check GPU driver updates

## 📝 Credits

Inspired by the holographic technology and UI design from:
- Marvel's Spider-Man: Far From Home
- Tony Stark's Iron Man technology
- Three.js community examples

## 📄 License

MIT License - Free to use, modify, and distribute!

## 🔗 Links

- **Repository:** https://github.com/25mhenry-alt/spiderman-hologram
- **Three.js:** https://threejs.org/
- **WebGL:** https://www.khronos.org/webgl/

---

**Made with ❤️ by 25mhenry-alt**

*"With great power comes great responsibility..."* 🕷️
