import { Component } from "../Component";
import { GeometryType } from "../../data/factory/MeshFactory";
import { MaterialType } from "../../data/factory/MaterialFactory";
import { MeshRendererComponentAdapter } from "../../../adapters/three/MeshRendererComponentAdapter";

export class MeshRendererComponent extends Component {
  // Properties
  private _meshType: GeometryType;
  private _materialType: MaterialType;

  private _meshRendererComponentAdapter: MeshRendererComponentAdapter;

  public get meshType(): GeometryType {
    return this._meshType;
  }
  public get materialType(): MaterialType {
    return this._materialType;
  }

  constructor(meshType: GeometryType, materialType: MaterialType) {
    super();

    this._meshType = meshType;
    this._materialType = materialType;

    this._meshRendererComponentAdapter = new MeshRendererComponentAdapter(this);
  }
}
