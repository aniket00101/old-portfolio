// Import the THREE.js core library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

// Import OrbitControls and GLTFLoader
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(1, 0, 1); // Closer position

// Create renderer with white background
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x800080); // Purple background
renderer.setSize(250, 400);
document.getElementById("container3D").appendChild(renderer.domElement);

// OrbitControls to allow mouse interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Disable zooming

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Brighter ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

// Load your model
const loader = new GLTFLoader();
loader.load(
  "./models/eye/scene.gltf", // Use your correct model path
  function (gltf) {
    const model = gltf.scene;

    // Optional: Center and scale model
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    model.position.sub(center); // Center the model
    const maxAxis = Math.max(size.x, size.y, size.z);
    model.scale.multiplyScalar(1.5 / maxAxis); // Uniform scaling

    scene.add(model);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error("An error occurred while loading the model:", error);
  }
);

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(250, 400);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
