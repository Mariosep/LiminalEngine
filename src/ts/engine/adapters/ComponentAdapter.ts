import { Component } from "../core/ecs/Component";
import { Entity } from "../core/ecs/Entity";
import { EntityAdapter } from "../core/ecs/EntityAdapter";
import * as THREE from "three";

export abstract class ComponentAdapter {
    private _component: Component;

    public get entityAdapter(): EntityAdapter | undefined {
        return this._component.entity?.adapter;
    }

    public get threeEntity(): THREE.Object3D | undefined {
        return this.entityAdapter?.threeEntity;
    }

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
