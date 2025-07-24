import { Vector2 } from "three";
import { IEngineModule } from "../IEngineModule";

export enum KeyCode {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
  SPACE = " ",
}

export class InputManager implements IEngineModule {
  private _keysDown: Map<string, boolean> = new Map();
  private _keysUp: Map<string, boolean> = new Map();
  private _mousePosition: Vector2 = new Vector2(0, 0);

  constructor() {
    window.addEventListener("keydown", this._onKeyDown.bind(this));
    window.addEventListener("keypress", this._onKeyPressed.bind(this));
    window.addEventListener("keyup", this._onKeyUp.bind(this));
    window.addEventListener("mousemove", this._onMouseMove.bind(this));
  }

  public init(): void {
    for (const key of Object.values(KeyCode)) {
      this._keysDown.set(key, false);
      this._keysUp.set(key, false);
    }
  }

  public update(): void {}

  public lateUpdate(): void {
    for (const key of Object.values(KeyCode)) {
      this._keysUp.set(key, false);
    }
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if (this._keysDown.get(event.key) === true) {
      return;
    }
    this._keysDown.set(event.key, true);
    this._keysUp.set(event.key, false);
    console.log(event.key);
  }

  private _onKeyPressed(event: KeyboardEvent): void {
    // console.log(event.key);
  }

  private _onKeyUp(event: KeyboardEvent): void {
    if (this._keysUp.get(event.key) === true) {
      return;
    }
    this._keysUp.set(event.key, true);
    this._keysDown.set(event.key, false);
    console.log(event.key);
  }

  private _onMouseMove(event: MouseEvent): void {
    this._mousePosition.set(event.clientX, event.clientY);
  }

  public isKeyDown(key: string): boolean {
    return this._keysDown.get(key) || false;
  }

  public isKeyUp(key: string): boolean {
    return this._keysUp.get(key) || false;
  }
}

export const inputManager = new InputManager();
