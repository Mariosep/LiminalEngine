import { IEngineModule } from "../core/IEngineModule";
import { Scene } from "../scene/Scene";
import { SceneManager } from "../scene/SceneManager";
import * as THREE from "three";
import { EventMediator } from "../core/EventMediator";
import { ServiceLocator } from "../core/ServiceLocator";

export class Renderer implements IEngineModule {
  private _sceneManager: SceneManager;
  private _renderer!: THREE.WebGLRenderer;

  private _eventMediator!: EventMediator;

  constructor(sceneManager: SceneManager) {
    this._sceneManager = sceneManager;
    this._eventMediator =
      ServiceLocator.instance().get<EventMediator>("EventMediator");
    console.log("Renderer constructor");
  }

  public init(): void {
    console.log("Renderer init");

    // Initialize Three.js renderer
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._renderer.domElement);

    // Handle window resize
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  public update(): void {
    console.log("Renderer update");
    const activeScene = this._sceneManager.getActiveScene();
    if (activeScene) {
      this.render(activeScene);
    }
  }

  public render(scene: Scene): void {
    // Update transforms for existing meshes
    scene.updateTransforms();

    // Render the scene
    this._renderer.render(scene.adapter.threeScene, scene.adapter.camera);
  }

  public setupSceneCallbacks(scene: Scene): void {
    this._eventMediator.subscribe(scene.id, scene.adapter);
  }

  private onWindowResize(): void {
    const activeScene = this._sceneManager.getActiveScene();
    if (activeScene) {
      activeScene.onWindowResize();
    }
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
