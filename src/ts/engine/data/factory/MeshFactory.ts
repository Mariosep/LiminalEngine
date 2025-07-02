import * as THREE from "three";

export enum GeometryType {
  CUBE = "cube",
  SPHERE = "sphere",
  CYLINDER = "cylinder",
}

export class GeometryFactory {
    
  public static create(meshType: GeometryType): THREE.BufferGeometry {
    switch (meshType) {
      case GeometryType.CUBE:
        return this.createCube();

      case GeometryType.SPHERE:
        return this.createSphere();

      case GeometryType.CYLINDER:
        return this.createCylinder();

      default:
        throw new Error(`Geometry type ${meshType} not found`);
    }
  }

  private static createCube(): THREE.BufferGeometry {
    return new THREE.BoxGeometry(1, 1, 1);
  }

  private static createSphere(): THREE.BufferGeometry {
    return new THREE.SphereGeometry(1, 32, 32);
  }

  private static createCylinder(): THREE.BufferGeometry {
    return new THREE.CylinderGeometry(1, 1, 1, 32);
  }
}
