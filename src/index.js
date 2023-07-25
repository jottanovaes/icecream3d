import "./styles.css";
import * as THREE from "three";

// controles de camera
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// carregar modelos/objetos
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// Modelo
import iceCreamShop from "./models/ice_cream_shop.glb";

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const CANVAS = document.querySelector("canvas.webgl");
const SCENE = new THREE.Scene();
const AMBIENT_LIGHT = new THREE.AmbientLight("#404040", 5);
const DIRECTIONAL_LIGHT = new THREE.DirectionalLight("#ffffff", 5);

const ASPECT_CAMERA = sizes.width / sizes.height;
const PERSPECTIVE_CAMERA = new THREE.PerspectiveCamera(
  120,
  ASPECT_CAMERA,
  0.5,
  100
);
const CONTROLS = new OrbitControls(PERSPECTIVE_CAMERA, CANVAS);
const GRID_HELPER = new THREE.GridHelper(20, 10);
const GLTF_LOADER = new GLTFLoader();

const RENDERER = new THREE.WebGLRenderer({ canvas: CANVAS });

DIRECTIONAL_LIGHT.position.set(0, 1, 0);
PERSPECTIVE_CAMERA.position.set(0, 0, 2);

SCENE.add(DIRECTIONAL_LIGHT, AMBIENT_LIGHT, PERSPECTIVE_CAMERA, GRID_HELPER);

function renderSizePixel() {
  RENDERER.setSize(sizes.width, sizes.height);
  RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

renderSizePixel();

function updateCanvas() {
  RENDERER.render(SCENE, PERSPECTIVE_CAMERA);
  window.requestAnimationFrame(updateCanvas);
}

function importModels() {
  GLTF_LOADER.load(
    iceCreamShop,
    (gltf) => {
      // movimentação
      // gltf.scene.position.set(0, 0, 0);
      SCENE.add(gltf.scene);
    },
    (progress) => {
      console.log(progress.loaded, progress.total);
    },
    (error) => {
      console.error(error);
    }
  );
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  PERSPECTIVE_CAMERA.aspect = ASPECT_CAMERA;
  PERSPECTIVE_CAMERA.updateProjectionMatrix();

  renderSizePixel();
});

importModels();
updateCanvas();
// "(FREE) Ice Cream Shop" (https://skfb.ly/oDuKZ) by LowPolyBoy is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
