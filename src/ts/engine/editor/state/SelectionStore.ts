import { makeAutoObservable } from "mobx";
import { Entity } from "../../core/ecs/Entity";

class SelectionStore {
    public selected: Entity[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public select(entity: Entity): void {
        this.selected.push(entity);
    }

    public deselect(entity: Entity): void {
        this.selected = this.selected.filter(e => e !== entity);
    }

    public clear(): void {
        this.selected = [];
    }
}

export const selectionStore = new SelectionStore();