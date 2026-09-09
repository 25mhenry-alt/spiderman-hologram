# Spider-Man Holographic Simulator 🕷️

An interactive 3D holographic Spider-Man simulation inspired by the hologram scene from **Spider-Man: Far From Home**.

## Features

- **3D Rotating Model**: Fully detailed Spider-Man figure with red and blue color scheme
- **Holographic Effects**: Glowing neon cyan effects, particle system, and dynamic lighting
- **Interactive Controls**:
  - **Drag** to rotate the hologram manually
  - **Scroll** to zoom in/out
  - **Change Pose**: Switch between idle, wall-crawling, web-shooting, and flying poses
  - **Toggle Particles**: Enable/disable the holographic particle effect
  - **Pause/Resume**: Control auto-rotation
  - **Intensity Slider**: Adjust the glow intensity and lighting

- **Animated Features**:
  - Continuous auto-rotation (when paused is off)
  - Pulsing glow effect
  - Dynamic light intensity
  - Holographic scan lines overlay
  - Real-time FPS counter
  - Signal strength indicator

## How to Use

1. Open `index.html` in a modern web browser
2. The hologram will start auto-rotating automatically
3. Use your mouse to interact:
   - Click and drag to manually rotate
   - Scroll wheel to zoom
4. Use the control panel on the right to:
   - Change Spider-Man's pose
   - Toggle particle effects
   - Pause/resume auto-rotation
   - Adjust intensity levels

## Technologies Used

- **Three.js**: 3D graphics library
- **HTML5/CSS3**: Structure and styling
- **JavaScript (ES6+)**: Interactive controls and animations
- **WebGL**: Hardware-accelerated rendering

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any browser with WebGL 2.0 support

## File Structure

```
├── index.html      # Main HTML file
├── styles.css      # Styling and animations
├── hologram.js     # 3D scene and logic
└─�� README.md       # This file
```

## Customization

You can customize the hologram by editing `hologram.js`:

- **Color Scheme**: Modify the material colors in `createSpiderMan()`
- **Particle Count**: Change `this.particleCount` in the `HologramParticles` class
- **Lighting**: Adjust `mainLight`, `rimLight`, and `ambientLight` intensities
- **Poses**: Add new poses in the `poses` object
- **Animation Speed**: Modify the rotation speed in the `animate()` function

## Credits

Inspired by the holographic technology scenes from Spider-Man: Far From Home and Marvel Cinematic Universe visuals.

## License

MIT License - Feel free to use, modify, and distribute!
