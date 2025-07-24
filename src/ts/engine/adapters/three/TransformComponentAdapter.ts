import { ComponentAdapter } from "../ComponentAdapter";
import { TransformComponent } from "../../core/ecs/components/TransformComponent";
import { Entity } from "../../core/ecs/Entity";

export class TransformComponentAdapter extends ComponentAdapter {
    private _transformComponent: TransformComponent;

    constructor(transformComponent: TransformComponent) {
        super(transformComponent);

        this._transformComponent = transformComponent;

        this._transformComponent.onParentChanged = this.onParentChanged.bind(this);
    }

    public update(): void {
        if (!this.threeEntity) {
            return;
        }

        this.threeEntity.position.copy(this._transformComponent.position);
        this.threeEntity.rotation.copy(this._transformComponent.rotation);
        this.threeEntity.scale.copy(this._transformComponent.scale);
    }

    protected override onComponentAddedToEntity(entity: Entity): void {}
    protected override onComponentRemovedFromEntity(entity: Entity): void {}

    private onParentChanged(parent: TransformComponent | null): void {
        const parentEntity = parent?.adapter.threeEntity;

        if (parentEntity) {
            parentEntity.add(this.threeEntity!);
        } else {
            this.threeEntity!.parent = null;
        }
    }
}
