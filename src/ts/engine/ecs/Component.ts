import { Entity } from "./Entity";
import { v4 as uuidv4 } from "uuid";

export class Component {

    private _id: string;
    protected _entity!: Entity;

    public get entity(): Entity { return this._entity; }
    public set entity(entity: Entity) { this._entity = entity; }

    constructor() {
        console.log("Component constructor");

        this._id = uuidv4();
    }

    public init(): void {
        if (!this._entity) {
            return;
        }
    }

    public update(): void {
        if (!this._entity) {
            return;
        }
    }
}