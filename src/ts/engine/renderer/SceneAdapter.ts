import { Scene } from "../scene/Scene";
import { Entity } from "../ecs/Entity";
import * as THREE from "three";
import { MeshRendererComponent } from "../ecs/components/MeshRendererComponent";
import { GeometryType } from "../data/factory/MeshFactory";
import { MaterialType } from "../data/factory/MaterialFactory";
import { ISceneEventListener } from "../core/EventMediator";

export class SceneAdapter implements ISceneEventListener {
  private _scene: Scene;
  private _threeScene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;
  private _entityMeshMap: Map<Entity, THREE.Mesh> = new Map();

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

    for (const entity of this._scene.entities) {
      this.onEntityAdded(entity);
    }
  }

  public onEntityAdded(entity: Entity): void {
    const mesh = this.createMeshForEntity(entity);
    if (mesh) {
      this._threeScene.add(mesh);
      this._entityMeshMap.set(entity, mesh);
    }
  }

  public onEntityRemoved(entity: Entity): void {
    const mesh = this._entityMeshMap.get(entity);
    if (mesh) {
      this._threeScene.remove(mesh);
      this._entityMeshMap.delete(entity);
    }
  }

  public updateTransforms(): void {
    for (const [entity, mesh] of this._entityMeshMap) {
      this.updateEntityTransform(entity, mesh);
    }
  }

  private createMeshForEntity(entity: Entity): THREE.Mesh | null {
    const meshRenderer = entity.getComponent(
      new MeshRendererComponent(GeometryType.CUBE, MaterialType.DEFAULT)
    ) as MeshRendererComponent;
    if (meshRenderer) {
      // Clone the mesh to avoid sharing references
      const originalMesh = (meshRenderer as any)._mesh as THREE.Mesh;
      const mesh = originalMesh.clone();

      // Apply initial transform
      this.updateEntityTransform(entity, mesh);

      return mesh;
    }
    return null;
  }

  private updateEntityTransform(entity: Entity, mesh: THREE.Mesh): void {
    const transform = entity.transform;
    if (transform) {
      mesh.position.copy(transform.position);
      mesh.rotation.set(
        transform.rotation.x,
        transform.rotation.y,
        transform.rotation.z
      );
      mesh.scale.copy(transform.scale);
    }
  }

  public onWindowResize(): void {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
  }
}
