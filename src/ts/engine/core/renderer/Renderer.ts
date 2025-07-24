import { IEngineModule } from "../IEngineModule";
import { Scene } from "../scene/Scene";
import { SceneManager } from "../scene/SceneManager";
import * as THREE from "three";

export class Renderer implements IEngineModule {
  private _sceneManager: SceneManager;
  private _renderer!: THREE.WebGLRenderer;

  public get canvas(): HTMLCanvasElement { return this._renderer.domElement; }

  constructor(sceneManager: SceneManager) {
    this._sceneManager = sceneManager;
  }

  public init(): void {
    // Initialize Three.js renderer
    const viewportCanvas = document.getElementById("viewport-canvas") as HTMLCanvasElement;
    this._renderer = new THREE.WebGLRenderer({ canvas: viewportCanvas });
    this._renderer.setSize(window.innerWidth, window.innerHeight);

    // Handle window resize
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  public update(): void {
    const activeScene = this._sceneManager.getActiveScene();
    if (activeScene) {
      this.render(activeScene);
    }
  }

  public render(scene: Scene): void {
    // Render the scene
    this._renderer.render(scene.adapter.threeScene, scene.adapter.camera);
  }

  private onWindowResize(): void {
    const activeScene = this._sceneManager.getActiveScene();
    if (activeScene) {
      activeScene.onWindowResize();
    }
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
