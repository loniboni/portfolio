import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('threejs-container');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0); // Set background to transparent
// Ensure high quality rendering on mobile devices
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance while maintaining quality

container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 1, 2); // Reverted camera position to its original value

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false; // Disable zooming to allow only rotation
controls.minDistance = 2.1;
controls.maxDistance = 3;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
groundMaterial.transparent = true;
groundMaterial.opacity = 0;
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

// Removed the SpotLight and replaced it with AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increased intensity to make the light brighter
scene.add(ambientLight);

let model;
const loader = new GLTFLoader().load('glb/final-tat-man.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);

  fitCameraToModel(camera, model, controls);
});

function fitCameraToModel(camera, model, controls) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const cameraZ = Math.abs(maxDim / Math.sin(fov / 2));

  camera.position.set(0.04244607196946303,1.447216894131905,2.3125091265845326)
  camera.lookAt(center);

  if (controls) {
    controls.target.copy(center);
    controls.update();
  }
}


function resizeRendererToContainer(renderer, container) {
  const canvas = renderer.domElement;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function animate() {
  requestAnimationFrame(animate);

  // Removed the rotation animation by commenting out the line that rotates the model
  // if (model) {
  //   model.rotation.y += 0.01;
  // }

  if (resizeRendererToContainer(renderer, container)) {
    const canvas = renderer.domElement;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  }


  renderer.setScissorTest(false);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(containerWidth, containerHeight);
});