import { MaterialType } from "../../engine/core/data/factory/MaterialFactory";
import { GeometryType } from "../../engine/core/data/factory/MeshFactory";
import { MeshRendererComponent } from "../../engine/core/ecs/components/MeshRendererComponent";
import { Entity } from "../../engine/core/ecs/Entity";
import { HideAndShowComponent } from "../components/HideAndShowComponent";
import { RotateAroundComponent } from "../components/RotateAroundComponent";

export class Cube extends Entity {
  constructor() {
    super();

    this.addComponent(
      new MeshRendererComponent(GeometryType.CUBE, MaterialType.DEFAULT)
    );
    this.addComponent(new RotateAroundComponent());
    this.addComponent(new HideAndShowComponent());
  }
}
