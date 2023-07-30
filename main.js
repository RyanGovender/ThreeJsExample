import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Step 1: Set up the environment
const container = document.getElementById("container");

// Step 2: Load the GLB model
const loader = new GLTFLoader();
const modelURL = "models/lambo.glb"; // Replace this with the path to your GLB model
let model;

loader.load(modelURL, (gltf) => {
  model = gltf.scene;

  // Step 3: Create the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Step 4: Add lights (optional)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Step 5: Render the model
  scene.add(model);

  camera.position.z = 8;
  camera.position.x = 12

  // Step 6: Add OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);

   // Step 7: Add keyboard controls
   const keyboardState = {};

   document.addEventListener('keydown', (event) => {
       keyboardState[event.code] = true;
   });

   document.addEventListener('keyup', (event) => {
       keyboardState[event.code] = false;
   });

  function animate() {
    requestAnimationFrame(animate);

     // Step 8: Move the model based on keyboard input
     const moveDistance = 0.1;

     if (keyboardState['KeyW']) { // Move up
         model.position.y += moveDistance;
     }

     if (keyboardState['KeyS']) { // Move down
         model.position.y -= moveDistance;
     }

     if (keyboardState['KeyA']) { // Move left
         model.position.x -= moveDistance;
     }

     if (keyboardState['KeyD']) { // Move right
         model.position.x += moveDistance;
     }
    // Add any animations or updates here if needed
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
  }

  animate();
});
