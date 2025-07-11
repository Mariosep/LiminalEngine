import { ComponentAdapter } from "./ComponentAdapter";
import { TransformComponent } from "../TransformComponent";
import { Entity } from "../../Entity";
import * as THREE from "three";

export class TransformComponentAdapter extends ComponentAdapter {
    private _transformComponent: TransformComponent;

    private get entity(): Entity | undefined { return this._transformComponent.entity; }

    constructor(transformComponent: TransformComponent) {
        super(transformComponent);

        this._transformComponent = transformComponent;
    }

    public update(): void {
        if (!this.entity) {
            return;
        }
        
        this.entity.adapter.threeEntity.position.copy(this._transformComponent.position);
        this.entity.adapter.threeEntity.rotation.copy(this._transformComponent.rotation);
        this.entity.adapter.threeEntity.scale.copy(this._transformComponent.scale);
    }
    
    protected override onComponentAddedToEntity(entity: Entity): void {
        
    }

    protected override onComponentRemovedFromEntity(entity: Entity): void {
        
    }
}