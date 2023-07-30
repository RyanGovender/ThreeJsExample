import * as THREE from 'three';

// Global variables
let scene, camera, renderer;
let car;

// Initialize the scene, camera, and renderer
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add event listener for window resizing
    window.addEventListener('resize', onWindowResize, false);

    // Add car model
    const loader = new THREE.GLTFLoader();

    loader.load('models/car.gltf', function (gltf) {
        car = gltf.scene;
        scene.add(car);
    });

    // Set initial camera position
    camera.position.set(0, 2, 5);
}

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Game loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle keyboard events for car movement
function handleKeyboardEvents() {
    const moveDistance = 0.1;
    const rotateAngle = Math.PI / 36; // 5 degrees

    const keyState = {};

    window.addEventListener('keydown', function (event) {
        keyState[event.key] = true;
    });

    window.addEventListener('keyup', function (event) {
        keyState[event.key] = false;
    });

    function update() {
        if (keyState['w']) {
            car.translateZ(-moveDistance);
        }
        if (keyState['s']) {
            car.translateZ(moveDistance);
        }
        if (keyState['a']) {
            car.rotation.y += rotateAngle;
        }
        if (keyState['d']) {
            car.rotation.y -= rotateAngle;
        }

        // Call update recursively
        requestAnimationFrame(update);
        renderer.render(scene, camera);
    }

    update();
}

// Call the necessary functions to start the application
init();
animate();
handleKeyboardEvents();
