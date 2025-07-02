import { MaterialType } from "../../engine/data/factory/MaterialFactory";
import { GeometryType } from "../../engine/data/factory/MeshFactory";
import { MeshRendererComponent } from "../../engine/ecs/components/MeshRendererComponent";
import { Entity } from "../../engine/ecs/Entity";
import { HideAndShowComponent } from "../components/HideAndShowComponent";
import { RotateAroundComponent } from "../components/RotateAroundComponent";

export class Cube extends Entity {

  constructor() {
    super();

    this.addComponent(new MeshRendererComponent(GeometryType.CUBE, MaterialType.DEFAULT));
    this.addComponent(new RotateAroundComponent());
    this.addComponent(new HideAndShowComponent());
  }
}