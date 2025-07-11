import { Component } from "../../Component";
import { Entity } from "../../Entity";

export abstract class ComponentAdapter {
    private _component: Component;

    constructor(component: Component) {
        this._component = component;

        this.subscribeToEvents();
    }

    private subscribeToEvents(): void {
        this._component.onComponentAddedToEntity = this.onComponentAddedToEntity.bind(this);
        this._component.onComponentRemovedFromEntity = this.onComponentRemovedFromEntity.bind(this);
    }

    protected abstract onComponentAddedToEntity(entity: Entity): void;
    protected abstract onComponentRemovedFromEntity(entity: Entity): void;
}