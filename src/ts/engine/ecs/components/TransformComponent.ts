import { Vector3 } from "three";
import { Component } from "../Component";

export class TransformComponent extends Component {

    // Properties
    private _position: Vector3;
    private _rotation: Vector3;
    private _scale: Vector3;

    // Getters and Setters
    public get position(): Vector3 { return this._position; }
    public set position(position: Vector3) { this._position = position; }

    public get rotation(): Vector3 { return this._rotation; }
    public set rotation(rotation: Vector3) { this._rotation = rotation; }

    public get scale(): Vector3 { return this._scale; }
    public set scale(scale: Vector3) { this._scale = scale; }

    constructor() {
        super();

        this._position = new Vector3(0, 0, 0);
        this._rotation = new Vector3(0, 0, 0);
        this._scale = new Vector3(1, 1, 1);
    }
}