import { Scene } from "./Scene";
import { Entity } from "../ecs/Entity";
import * as THREE from "three";

export class SceneAdapter {
    private _scene: Scene;
    
    private _threeScene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;

    public get threeScene(): THREE.Scene { return this._threeScene; }
    public get camera(): THREE.PerspectiveCamera { return this._camera; }

    constructor(scene: Scene) {
        this._scene = scene;

        // Initialize Three.js scene and camera
        this._threeScene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this._camera.position.z = 5;

        this.subscribeToEvents();
    }

    private subscribeToEvents(): void {
        this._scene.onEntityAdded = this.onEntityAdded.bind(this);
        this._scene.onEntityRemoved = this.onEntityRemoved.bind(this);
    }

    public onEntityAdded(entity: Entity): void {
        const entityAdapter = entity.adapter;
        this._threeScene.add(entityAdapter.threeEntity);
    }

    public onEntityRemoved(entity: Entity): void {
        const entityAdapter = entity.adapter;
        this._threeScene.remove(entityAdapter.threeEntity);
    }
                    
    public onWindowResize(): void {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
    }
}
