import { Entity } from "../ecs/Entity";
import { v4 as uuidv4 } from "uuid";
import { SceneAdapter } from "./SceneAdapter";

export class Scene {
    private _id: string;
    private _entities: Entity[] = [];
    private _adapter!: SceneAdapter;

    // Events
    public onEntityAdded: (entity: Entity) => void = () => {};
    public onEntityRemoved: (entity: Entity) => void = () => {};
    
    public get entities(): Entity[] { return this._entities; }
    public get id(): string { return this._id; }
    public get adapter(): SceneAdapter { return this._adapter; }

    constructor() {
        this._id = uuidv4();
        this._entities = [];

        this._adapter = new SceneAdapter(this);
    }

    public init(): void {
        
    }

    public update(): void {
        for (const entity of this._entities) {
            entity.update();
        }
    }

    public add(entity: Entity): void {
        this._entities.push(entity);

        this.onEntityAdded(entity);
    }

    public remove(entity: Entity): void {
        const index = this._entities.indexOf(entity);
        if (index !== -1) {
            this._entities.splice(index, 1);

            this.onEntityRemoved(entity);
        }
    }

    public onWindowResize(): void {
        this._adapter.onWindowResize();
    }
}
