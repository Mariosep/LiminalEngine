import { Entity } from "./Entity";
import { v4 as uuidv4 } from "uuid";

export class Component {

    private _id: string;
    protected _entity: Entity | undefined;

    public get entity(): Entity | undefined { return this._entity; }
    public set entity(entity: Entity) { this._entity = entity; }

    // Events
    public onComponentAddedToEntity: (entity: Entity) => void = () => {};
    public onComponentRemovedFromEntity: (entity: Entity) => void = () => {};

    constructor() {
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

    public onAddedToEntity(entity: Entity): void {
        this._entity = entity;

        this.onComponentAddedToEntity(entity);
    }

    public onRemovedFromEntity(entity: Entity): void {
        this._entity = undefined;

        this.onComponentRemovedFromEntity(entity);
    }
}