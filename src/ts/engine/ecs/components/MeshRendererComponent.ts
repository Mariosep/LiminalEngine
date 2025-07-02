import * as THREE from "three";
import { Component } from "../Component";
import { GeometryFactory, GeometryType } from "../../data/factory/MeshFactory";
import { MaterialFactory, MaterialType } from "../../data/factory/MaterialFactory";

export class MeshRendererComponent extends Component {
  // Properties
  private _mesh: THREE.Mesh;

  public get geometry(): THREE.BufferGeometry { return this._mesh.geometry; }
  public get material(): THREE.Material { return this._mesh.material as THREE.Material; }

  constructor(meshType: GeometryType, materialType: MaterialType) {
    super();

    this._mesh = new THREE.Mesh(GeometryFactory.create(meshType), MaterialFactory.create(materialType));
  }
}
