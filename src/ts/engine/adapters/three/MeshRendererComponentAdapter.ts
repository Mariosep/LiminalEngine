import { MaterialFactory } from "../../core/data/factory/MaterialFactory";
import { GeometryFactory } from "../../core/data/factory/MeshFactory";
import { Entity } from "../../core/ecs/Entity";
import { MeshRendererComponent } from "../../core/ecs/components/MeshRendererComponent";
import { ComponentAdapter } from "../ComponentAdapter";
import * as THREE from "three";

export class MeshRendererComponentAdapter extends ComponentAdapter {
    private _meshRendererComponent: MeshRendererComponent;

    private _threeMesh: THREE.Mesh;

    public get threeMesh(): THREE.Mesh {
        return this._threeMesh;
    }

    constructor(meshRendererComponent: MeshRendererComponent) {
        super(meshRendererComponent);

        this._meshRendererComponent = meshRendererComponent;

        this._threeMesh = new THREE.Mesh(
            GeometryFactory.create(meshRendererComponent.meshType),
            MaterialFactory.create(meshRendererComponent.materialType)
        );
    }

    protected override onComponentAddedToEntity(entity: Entity): void {
        entity.adapter.threeEntity.add(this._threeMesh);
    }

    protected override onComponentRemovedFromEntity(entity: Entity): void {
        entity.adapter.threeEntity.remove(this._threeMesh);
    }
}