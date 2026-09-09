// Three.js Scene Setup
const container = document.getElementById('hologramContainer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0.1);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

camera.position.z = 3;

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

    // Torso
    const torsoGeometry = new THREE.BoxGeometry(0.45, 0.7, 0.35);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x0055ff,
        metalness: 0.4,
        roughness: 0.5,
        emissive: 0x001155
    });
    const torso = new THREE.Mesh(torsoGeometry, bodyMaterial);
    torso.position.y = 0.4;
    torso.castShadow = true;
    spiderManGroup.add(torso);

    // Spider Logo on chest (glowing circle)
    const logoGeometry = new THREE.CircleGeometry(0.15, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, emissive: 0xff0000 });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.5, 0.2);
    spiderManGroup.add(logo);

    // Left Arm
    const armGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.2);
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-0.4, 0.5, 0);
    leftArm.castShadow = true;
    spiderManGroup.add(leftArm);

    // Right Arm
    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(0.4, 0.5, 0);
    rightArm.castShadow = true;
    spiderManGroup.add(rightArm);

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

    // Web lines (decorative)
    const webMaterial = new THREE.LineBasicMaterial({ color: 0x00d4ff, linewidth: 2 });
    const webPoints = [
        new THREE.Vector3(-0.3, 0.8, 0.25),
        new THREE.Vector3(0.3, 0.6, 0.25),
        new THREE.Vector3(-0.3, 0.4, 0.25)
    ];
    const webGeometry = new THREE.BufferGeometry().setFromPoints(webPoints);
    const webLine = new THREE.Line(webGeometry, webMaterial);
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

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

container.addEventListener('mousemove', (e) => {
    if (isDragging) {
        autoRotate = false;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        spiderManGroup.rotation.y += deltaX * 0.01;
        spiderManGroup.rotation.x += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    }
});

container.addEventListener('mouseup', () => {
    isDragging = false;
});

container.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.001;
    camera.position.z = Math.max(1.5, Math.min(10, camera.position.z));
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

    // Update signal strength
    const signalLevel = Math.floor((Math.sin(Date.now() * 0.003) + 1) * 5);
    document.getElementById('signal').textContent = '█'.repeat(signalLevel) + '░'.repeat(10 - signalLevel);

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