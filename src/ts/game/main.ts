import "../../css/style.css";
import { Engine } from "../engine/core/Engine";
import { GameScene } from "./scenes/GameScene";

const engine: Engine = new Engine();

const gameScene: GameScene = new GameScene();
engine.setActiveScene(gameScene);

engine.init();

// const scene: THREE.Scene = new THREE.Scene();
// const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
// });
// const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// function animate(): void {
//   renderer.render(scene, camera);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
// }

// renderer.setAnimationLoop(animate);
