// Three.js Scene Setup
const container = document.getElementById('hologramContainer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Position canvas absolutely within the container
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0.1);
renderer.shadowMap.enabled = true;
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '1';

container.style.position = 'relative';
container.appendChild(renderer.domElement);

camera.position.z = 3;

// Suit & Web Configuration
const suitConfigs = {
    stark: {
        name: 'STARK SUIT',
        bodyColor: 0x0055ff,
        accentColor: 0xff0000,
        metalness: 0.5,
        roughness: 0.4,
        emissive: 0x001155
    },
    homemade: {
        name: 'HOMEMADE SUIT',
        bodyColor: 0xaa0000,
        accentColor: 0x0055ff,
        metalness: 0.2,
        roughness: 0.8,
        emissive: 0x440000
    },
    stealth: {
        name: 'STEALTH SUIT',
        bodyColor: 0x1a1a2e,
        accentColor: 0x00ff00,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x0a0a0f
    },
    ironspider: {
        name: 'IRON SPIDER SUIT',
        bodyColor: 0xffaa00,
        accentColor: 0xff0000,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x553300
    }
};

const webConfigs = {
    standard: {
        name: 'STANDARD',
        viscosity: 'MEDIUM',
        dissolveTime: '60MIN',
        color: 0x00d4ff,
        emission: 0x00ffff
    },
    impact: {
        name: 'IMPACT',
        viscosity: 'HIGH',
        dissolveTime: '90MIN',
        color: 0xff0000,
        emission: 0xff3333
    },
    ricochet: {
        name: 'RICOCHET',
        viscosity: 'LOW',
        dissolveTime: '30MIN',
        color: 0x00ff00,
        emission: 0x00ff66
    },
    explosive: {
        name: 'EXPLOSIVE',
        viscosity: 'VERY HIGH',
        dissolveTime: '120MIN',
        color: 0xffff00,
        emission: 0xffff99
    }
};

let currentSuit = 'stark';
let currentWeb = 'standard';

// Lighting Setup
const ambientLight = new THREE.AmbientLight(0x00d4ff, 0.4);
scene.add(ambientLight);

const mainLight = new THREE.PointLight(0x00d4ff, 1.5, 100);
mainLight.position.set(5, 5, 5);
mainLight.castShadow = true;
scene.add(mainLight);

const rimLight = new THREE.PointLight(0xff006e, 0.8, 100);
rimLight.position.set(-5, 3, -5);
scene.add(rimLight);

// Spider-Man Model Creation
const spiderManGroup = new THREE.Group();
scene.add(spiderManGroup);

// Store references to suit materials for easy updates
let suitMaterials = {};

const poses = {
    idle: () => {
        spiderManGroup.rotation.y = 0;
        spiderManGroup.rotation.x = 0;
    },
    crawling: () => {
        spiderManGroup.rotation.y = Math.PI / 6;
        spiderManGroup.rotation.x = Math.PI / 8;
    },
    shooting: () => {
        spiderManGroup.rotation.y = Math.PI / 4;
        spiderManGroup.rotation.x = -Math.PI / 6;
    },
    flying: () => {
        spiderManGroup.rotation.y = 0;
        spiderManGroup.rotation.x = Math.PI / 12;
    }
};

let currentPose = 'idle';

function createSpiderMan() {
    // Head
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const redMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        metalness: 0.3,
        roughness: 0.6,
        emissive: 0x440000
    });
    const head = new THREE.Mesh(headGeometry, redMaterial);
    head.position.y = 1.1;
    head.castShadow = true;
    spiderManGroup.add(head);

    // Eyes (glowing white)
    const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0x00d4ff });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 1.2, 0.3);
    spiderManGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 1.2, 0.3);
    spiderManGroup.add(rightEye);

    // Torso (suit body)
    const torsoGeometry = new THREE.BoxGeometry(0.45, 0.7, 0.35);
    const suitConfig = suitConfigs[currentSuit];
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: suitConfig.bodyColor,
        metalness: suitConfig.metalness,
        roughness: suitConfig.roughness,
        emissive: suitConfig.emissive
    });
    suitMaterials.body = bodyMaterial;
    
    const torso = new THREE.Mesh(torsoGeometry, bodyMaterial);
    torso.position.y = 0.4;
    torso.castShadow = true;
    spiderManGroup.add(torso);

    // Spider Logo on chest (glowing circle)
    const logoGeometry = new THREE.CircleGeometry(0.15, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
        color: suitConfig.accentColor, 
        emissive: suitConfig.accentColor 
    });
    suitMaterials.logo = logoMaterial;
    
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.5, 0.2);
    spiderManGroup.add(logo);

    // Left Arm
    const armGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-0.4, 0.5, 0);
    leftArm.castShadow = true;
    spiderManGroup.add(leftArm);

    // Right Arm (with web shooter indicator)
    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(0.4, 0.5, 0);
    rightArm.castShadow = true;
    spiderManGroup.add(rightArm);

    // Web Shooter on right arm (small glowing box)
    const shooterGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.12);
    const shooterMaterial = new THREE.MeshBasicMaterial({ 
        color: webConfigs[currentWeb].color, 
        emissive: webConfigs[currentWeb].emission 
    });
    suitMaterials.shooter = shooterMaterial;
    
    const shooter = new THREE.Mesh(shooterGeometry, shooterMaterial);
    shooter.position.set(0.45, 0.2, 0);
    spiderManGroup.add(shooter);

    // Left Leg
    const legGeometry = new THREE.BoxGeometry(0.2, 0.7, 0.2);
    const leftLeg = new THREE.Mesh(legGeometry, redMaterial);
    leftLeg.position.set(-0.2, -0.3, 0);
    leftLeg.castShadow = true;
    spiderManGroup.add(leftLeg);

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeometry, redMaterial);
    rightLeg.position.set(0.2, -0.3, 0);
    rightLeg.castShadow = true;
    spiderManGroup.add(rightLeg);

    // Dynamic web lines
    updateWebLines();
}

function updateWebLines() {
    // Remove old web lines
    const oldWebLines = spiderManGroup.children.filter(child => child.userData.isWebLine);
    oldWebLines.forEach(line => spiderManGroup.remove(line));

    // Create new web lines with current web color
    const webMaterial = new THREE.LineBasicMaterial({ 
        color: webConfigs[currentWeb].color, 
        linewidth: 2 
    });
    const webPoints = [
        new THREE.Vector3(-0.3, 0.8, 0.25),
        new THREE.Vector3(0.3, 0.6, 0.25),
        new THREE.Vector3(-0.3, 0.4, 0.25)
    ];
    const webGeometry = new THREE.BufferGeometry().setFromPoints(webPoints);
    const webLine = new THREE.Line(webGeometry, webMaterial);
    webLine.userData.isWebLine = true;
    spiderManGroup.add(webLine);
}

createSpiderMan();

// Particle System for Hologram Effect
class HologramParticles {
    constructor() {
        this.particles = [];
        this.particleGeometry = new THREE.BufferGeometry();
        this.particleCount = 500;
        this.createParticles();
    }

    createParticles() {
        const positions = [];
        const velocities = [];

        for (let i = 0; i < this.particleCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            velocities.push(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
        }

        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
        this.velocities = new Float32Array(velocities);

        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00d4ff,
            size: 0.02,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.6,
            emissive: 0x00d4ff
        });

        this.mesh = new THREE.Points(this.particleGeometry, particleMaterial);
        scene.add(this.mesh);
    }

    update() {
        const positions = this.particleGeometry.attributes.position.array;

        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            positions[i3] += this.velocities[i3];
            positions[i3 + 1] += this.velocities[i3 + 1];
            positions[i3 + 2] += this.velocities[i3 + 2];

            // Wrap particles around
            if (Math.abs(positions[i3]) > 2) this.velocities[i3] *= -1;
            if (Math.abs(positions[i3 + 1]) > 2) this.velocities[i3 + 1] *= -1;
            if (Math.abs(positions[i3 + 2]) > 2) this.velocities[i3 + 2] *= -1;
        }

        this.particleGeometry.attributes.position.needsUpdate = true;
    }

    setVisibility(visible) {
        this.mesh.visible = visible;
    }
}

let particles = new HologramParticles();
let particlesVisible = true;

// Glow Effect
const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
});
const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glowSphere);

// Interactive Controls
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let autoRotate = true;

renderer.domElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

renderer.domElement.addEventListener('mousemove', (e) => {
    if (isDragging) {
        autoRotate = false;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        spiderManGroup.rotation.y += deltaX * 0.01;
        spiderManGroup.rotation.x += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
});

renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
});

renderer.domElement.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.001;
    camera.position.z = Math.max(1.5, Math.min(10, camera.position.z));
});

// Smooth suit transition with hologram effect
function transitionSuit(newSuit) {
    if (newSuit === currentSuit) return;

    currentSuit = newSuit;
    const suitConfig = suitConfigs[currentSuit];

    // Smooth color transition
    const transitionDuration = 600;
    const startTime = Date.now();

    const transitionLoop = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / transitionDuration, 1);

        // Flash effect during transition
        const flash = Math.sin(progress * Math.PI * 4) * 0.3;
        
        if (suitMaterials.body) {
            suitMaterials.body.emissiveIntensity = 0.5 + flash;
        }
        if (suitMaterials.logo) {
            suitMaterials.logo.emissiveIntensity = 0.7 + flash;
        }

        if (progress === 1) {
            // Apply final colors
            if (suitMaterials.body) {
                suitMaterials.body.color.setHex(suitConfig.bodyColor);
                suitMaterials.body.metalness = suitConfig.metalness;
                suitMaterials.body.roughness = suitConfig.roughness;
                suitMaterials.body.emissive.setHex(suitConfig.emissive);
                suitMaterials.body.emissiveIntensity = 0.3;
            }
            if (suitMaterials.logo) {
                suitMaterials.logo.color.setHex(suitConfig.accentColor);
                suitMaterials.logo.emissive.setHex(suitConfig.accentColor);
                suitMaterials.logo.emissiveIntensity = 0.5;
            }
            
            // Update suit indicator
            document.getElementById('suitIndicator').textContent = suitConfig.name;
        } else {
            requestAnimationFrame(transitionLoop);
        }
    };

    transitionLoop();
}

// Smooth web fluid transition
function transitionWeb(newWeb) {
    if (newWeb === currentWeb) return;

    currentWeb = newWeb;
    const webConfig = webConfigs[currentWeb];

    // Smooth shooter material transition
    const transitionDuration = 400;
    const startTime = Date.now();

    const transitionLoop = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / transitionDuration, 1);

        if (suitMaterials.shooter) {
            suitMaterials.shooter.emissiveIntensity = 0.6 + Math.sin(progress * Math.PI) * 0.4;
        }

        if (progress === 1) {
            if (suitMaterials.shooter) {
                suitMaterials.shooter.color.setHex(webConfig.color);
                suitMaterials.shooter.emissive.setHex(webConfig.emission);
                suitMaterials.shooter.emissiveIntensity = 0.6;
            }
            updateWebLines();
            
            // Update fluid info
            document.getElementById('fluidType').textContent = webConfig.name;
            document.getElementById('fluidViscosity').textContent = webConfig.viscosity;
            document.getElementById('fluidDissolve').textContent = webConfig.dissolveTime;
        } else {
            requestAnimationFrame(transitionLoop);
        }
    };

    transitionLoop();
}

// Suit selector buttons
document.querySelectorAll('.ctrl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        transitionSuit(e.target.dataset.suit);
    });
});

// Web selector buttons
document.querySelectorAll('.web-ctrl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.web-ctrl-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        transitionWeb(e.target.dataset.web);
    });
});

// UI Controls
document.getElementById('poseBtn').addEventListener('click', () => {
    const poseNames = Object.keys(poses);
    const currentIndex = poseNames.indexOf(currentPose);
    currentPose = poseNames[(currentIndex + 1) % poseNames.length];
    poses[currentPose]();
});

document.getElementById('toggleParticles').addEventListener('click', () => {
    particlesVisible = !particlesVisible;
    particles.setVisibility(particlesVisible);
});

document.getElementById('toggleRotation').addEventListener('click', () => {
    autoRotate = !autoRotate;
});

const intensitySlider = document.getElementById('intensitySlider');
intensitySlider.addEventListener('input', (e) => {
    const intensity = parseFloat(e.target.value);
    mainLight.intensity = 1.5 * intensity;
    rimLight.intensity = 0.8 * intensity;
    glowMaterial.opacity = 0.15 * intensity;
    document.getElementById('intensityValue').textContent = Math.round(intensity * 100) + '%';
});

// FPS Counter
let frameCount = 0;
let lastTime = Date.now();

function updateFPS() {
    frameCount++;
    const currentTime = Date.now();
    if (currentTime - lastTime >= 1000) {
        document.getElementById('fps').textContent = `FPS: ${frameCount}`;
        frameCount = 0;
        lastTime = currentTime;
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Auto rotate when not dragging
    if (autoRotate) {
        spiderManGroup.rotation.y += 0.005;
    }

    // Animate pose transitions smoothly
    poses[currentPose]();

    // Update particles
    if (particlesVisible) {
        particles.update();
    }

    // Pulsing glow effect
    glowSphere.material.opacity = 0.15 * (0.8 + Math.sin(Date.now() * 0.002) * 0.2);

    // Animate lights
    mainLight.intensity = 1.5 + Math.sin(Date.now() * 0.001) * 0.3;

    // Update signal strength - animated dots
    const signalLevel = Math.floor((Math.sin(Date.now() * 0.003) + 1) * 2.5);
    let signalDisplay = '';
    for (let i = 0; i < 5; i++) {
        signalDisplay += i < signalLevel ? '● ' : '○ ';
    }
    document.getElementById('signal').textContent = signalDisplay;

    updateFPS();

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});