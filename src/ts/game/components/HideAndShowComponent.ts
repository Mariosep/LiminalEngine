import { Component } from "../../engine/core/ecs/Component";
import { inputManager, KeyCode } from "../../engine/core/input/InputManager";

export class HideAndShowComponent extends Component {
  private _isVisible: boolean = true;

  public get isVisible(): boolean {
    return this._isVisible;
  }

  public init(): void {
    super.init();
    this.entity!.active = false;
  }

  public update(): void {
    super.update();

    if (inputManager.isKeyUp(KeyCode.SPACE)) {
      this.entity!.active = !this.entity!.active;
      this._isVisible = !this._isVisible;
    }
  }
}
