import { makeAutoObservable } from "mobx";
import { Scene } from "../../core/scene/Scene";

class SceneStore {
    public scene: Scene | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public setScene(scene: Scene) {
        this.scene = scene;
    }
}

export const sceneStore = new SceneStore();