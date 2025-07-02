import { Component } from "../../engine/ecs/Component";
import { inputManager, KeyCode } from "../../engine/input/InputManager";

export class HideAndShowComponent extends Component {
  private _isVisible: boolean = true;

  public get isVisible(): boolean { return this._isVisible; }

  public update(): void {
    super.update();

    if (inputManager.isKeyDown(KeyCode.SPACE)) {
      console.log("Space key pressed");
    }
  }
}