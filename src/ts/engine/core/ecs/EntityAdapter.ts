import { Entity } from "./Entity";
import * as THREE from "three";

export class EntityAdapter {
    private _entity: Entity;
    private _threeEntity: THREE.Object3D;

    public get entity(): Entity { return this._entity; }
    public get threeEntity(): THREE.Object3D { return this._threeEntity; }

    constructor(entity: Entity) {
        this._entity = entity;
        this._threeEntity = new THREE.Object3D();

        this.subscribeToEvents();
    }

    private subscribeToEvents(): void {
        this._entity.onActiveChanged = this.onActiveChanged.bind(this);
    }

    private onActiveChanged(active: boolean): void {
        this._threeEntity.visible = active;
    }
}