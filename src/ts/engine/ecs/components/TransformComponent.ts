
import { Component } from "../Component";
import { TransformComponentAdapter } from "./adapters/TransformComponentAdapter";
import * as THREE from "three";

export class TransformComponent extends Component {

    // Properties
    private _position: THREE.Vector3;
    private _rotation: THREE.Euler;
    private _scale: THREE.Vector3;

    private _transformComponentAdapter: TransformComponentAdapter;

    // Events
    public onPositionChanged: (position: THREE.Vector3) => void = () => {};
    public onRotationChanged: (rotation: THREE.Euler) => void = () => {};
    public onScaleChanged: (scale: THREE.Vector3) => void = () => {};

    // Getters and Setters
    public get position(): THREE.Vector3 { return this._position; }
    public set position(position: THREE.Vector3) {
        this._position = position;
        this.onPositionChanged(position);
    }

    public get rotation(): THREE.Euler { return this._rotation; }
    public set rotation(rotation: THREE.Euler) {
        this._rotation = rotation;
        this.onRotationChanged(rotation);
    }

    public get scale(): THREE.Vector3 { return this._scale; }
    public set scale(scale: THREE.Vector3) {
        this._scale = scale;
        this.onScaleChanged(scale);
    }

    constructor() {
        super();

        this._position = new THREE.Vector3(0, 0, 0);
        this._rotation = new THREE.Euler(0, 0, 0);
        this._scale = new THREE.Vector3(1, 1, 1);

        this._transformComponentAdapter = new TransformComponentAdapter(this);
    }

    public update(): void {
        this._transformComponentAdapter.update();
    }
}