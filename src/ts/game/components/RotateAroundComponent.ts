import { Component } from "../../engine/ecs/Component";

export class RotateAroundComponent extends Component {
  private _speed: number = 0.01;

  public get speed(): number { return this._speed; }

  public update(): void {
    super.update();

    this._entity.transform.rotation.y += this._speed;
  }
}