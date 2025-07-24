import { Component } from "../Component";
import { TransformComponentAdapter } from "../../../adapters/three/TransformComponentAdapter";
import * as THREE from "three";

export class TransformComponent extends Component {
    // Properties
    private _parent: TransformComponent | null = null;
    private _children: TransformComponent[] = [];

    private _position: THREE.Vector3;
    private _rotation: THREE.Euler;
    private _scale: THREE.Vector3;

    private _transformComponentAdapter: TransformComponentAdapter;

    // Events
    public onParentChanged: (parent: TransformComponent | null) => void = () => {};
    public onPositionChanged: (position: THREE.Vector3) => void = () => {};
    public onRotationChanged: (rotation: THREE.Euler) => void = () => {};
    public onScaleChanged: (scale: THREE.Vector3) => void = () => {};

    // Getters and Setters
    public get parent(): TransformComponent | null { return this._parent; }
    public get children(): TransformComponent[] { return this._children; }

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

    public get adapter(): TransformComponentAdapter { return this._transformComponentAdapter; }

    constructor() {
        super();

        this._parent = null;
        this._children = [];

        this._position = new THREE.Vector3(0, 0, 0);
        this._rotation = new THREE.Euler(0, 0, 0);
        this._scale = new THREE.Vector3(1, 1, 1);

        this._transformComponentAdapter = new TransformComponentAdapter(this);
    }

    public update(): void {
        this._transformComponentAdapter.update();
    }

    public setParent(parent: TransformComponent | null): void {
        this._parent = parent;
        
        // Auto-add to scene if parent is in a scene and this entity isn't
        if (parent && this.entity && this.entity.scene === null) {
            const parentEntity = parent.entity;
            if (parentEntity && parentEntity.scene) {
                parentEntity.scene.add(this.entity);
            }
        }

        this.onParentChanged(parent);
    }
}
