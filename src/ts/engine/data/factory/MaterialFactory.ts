import * as THREE from "three";

export enum MaterialType {
  DEFAULT = "default",
}

export class MaterialFactory {

  public static create(materialType: MaterialType): THREE.Material {
    switch (materialType) {
      case MaterialType.DEFAULT:
        return new THREE.MeshBasicMaterial();

      default:
        throw new Error(`Material type ${materialType} not found`);
    }
  }
}