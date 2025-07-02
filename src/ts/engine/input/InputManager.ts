import { Vector2 } from "three";
import { IEngineModule } from "../core/IEngineModule";

export enum KeyCode {
  W = "w",
  A = "a",
  S = "s",
  D = "d",
  SPACE = " ",
}

export class InputManager implements IEngineModule {

  private _keys: Map<string, boolean> = new Map();
  private _mousePosition: Vector2 = new Vector2(0, 0);

  constructor() {
    console.log("InputManager constructor");

    window.addEventListener("keydown", this._onKeyDown.bind(this));
    window.addEventListener("keyup", this._onKeyUp.bind(this));
    window.addEventListener("mousemove", this._onMouseMove.bind(this));
  }

  public init(): void {
    console.log("InputManager init");    

    for (const key of Object.values(KeyCode)) {
      this._keys.set(key, false);
    }
  }

  public update(): void {
    console.log("InputManager update");
  }

  private _onKeyDown(event: KeyboardEvent): void {
    this._keys.set(event.key, true);
  }

  private _onKeyUp(event: KeyboardEvent): void {
    this._keys.set(event.key, false);
  }

  private _onMouseMove(event: MouseEvent): void {
    this._mousePosition.set(event.clientX, event.clientY);
  }

  public isKeyDown(key: string): boolean {
    return this._keys.get(key) || false;
  }
}

export const inputManager = new InputManager();