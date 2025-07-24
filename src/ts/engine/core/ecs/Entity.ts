import { Component } from "./Component";
import { v4 as uuidv4 } from "uuid";
import { TransformComponent } from "./components/TransformComponent";
import { EntityAdapter } from "./EntityAdapter";
import { Scene } from "../scene/Scene";

export class Entity {
    private _id: string = "";
    private _name: string = "";
    private _components: Map<string, Component> = new Map();
    private _active: boolean = true;

    private _scene: Scene | null = null;

    private _entityAdapter: EntityAdapter;

    // Events
    public onActiveChanged: (active: boolean) => void = () => {};

    public get id(): string {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }
    
    public get transform(): TransformComponent {
        return this._components.get("TransformComponent") as TransformComponent;
    }

    public get active(): boolean {
        return this._active;
    }
    public set active(active: boolean) {
        this._active = active;
        this.onActiveChanged(active);
    }

    public get adapter(): EntityAdapter {
        return this._entityAdapter;
    }

    public get scene(): Scene | null {
        return this._scene;
    }
    public set scene(scene: Scene | null) {
        this._scene = scene;
    }

    constructor() {
        this._id = uuidv4();
        this._name = "";
        this._components = new Map();

        this._entityAdapter = new EntityAdapter(this);

        this.addComponent(new TransformComponent());
    }

    public init(): void {
        for (const component of this._components.values()) {
            component.init();
        }
    }

    public update(): void {
        for (const component of this._components.values()) {
            component.update();
        }
    }

    public addComponent<T extends Component>(component: T): void {
        this._components.set(component.constructor.name, component);
        component.entity = this;

        component.onComponentAddedToEntity(this);
    }

    public removeComponent<T extends Component>(component: T): void {
        // Prevent removing the transform component
        if (component.constructor.name === "TransformComponent") {
            return;
        }

        this._components.delete(component.constructor.name);
    }

    public getComponent<T extends Component>(component: T): T | undefined {
        return this._components.get(component.constructor.name) as T;
    }
}
