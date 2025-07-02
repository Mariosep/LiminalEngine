import { IEngineModule } from "../core/IEngineModule";
import { Scene } from "./Scene";

export class SceneManager implements IEngineModule {
  private _scenes: Map<string, Scene> = new Map();
  private _currentScene: Scene | undefined;

  constructor() {
    console.log("SceneManager constructor");
    this._scenes = new Map();
    this._currentScene = undefined;
  }

  public init(): void {
    
  }

  public update(): void {
    if (this._currentScene) {
      this._currentScene.update();
    }
  }

  public setActiveScene(scene: Scene) {
    this._currentScene = scene;
    this._currentScene.init();
  }

  public getActiveScene(): Scene | undefined {
    return this._currentScene;
  }
}
