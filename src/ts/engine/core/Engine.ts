import { InputManager } from "../input/InputManager";
import { Renderer } from "../renderer/Renderer";
import { Scene } from "../scene/Scene";
import { SceneManager } from "../scene/SceneManager";
import { TimeManager } from "./TimeManager";
import { EventMediator } from "./EventMediator";
import { ServiceLocator } from "./ServiceLocator";

export class Engine {
  private _sceneManager: SceneManager;
  private _renderer: Renderer;
  private _inputManager: InputManager;
  private _timeManager: TimeManager;
  private _eventMediator: EventMediator;

  constructor() {
    this._eventMediator = new EventMediator();

    // Register services with ServiceLocator
    ServiceLocator.instance().register("EventMediator", this._eventMediator);

    this._sceneManager = new SceneManager();
    this._renderer = new Renderer(this._sceneManager);
    this._inputManager = new InputManager();
    this._timeManager = new TimeManager();
  }

  public init() {
    this._renderer.init();
    this._sceneManager.init();
    this._inputManager.init();
    this._timeManager.init();

    requestAnimationFrame(this.update.bind(this));
  }

  public update() {
    this._timeManager.update();

    this._renderer.update();
    this._sceneManager.update();
    this._inputManager.update();

    requestAnimationFrame(this.update.bind(this));
  }

  public setActiveScene(scene: Scene) {
    this._sceneManager.setActiveScene(scene);
    this._renderer.setupSceneCallbacks(scene);
  }

  public get eventMediator(): EventMediator {
    return this._eventMediator;
  }
}
