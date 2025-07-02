import { Entity } from "../ecs/Entity";

export interface ISceneEventListener {
  onEntityAdded(entity: Entity): void;
  onEntityRemoved(entity: Entity): void;
  onEntityActiveChanged(entity: Entity, active: boolean): void;
}

export class EventMediator {
  private _sceneListeners: Map<string, ISceneEventListener[]> = new Map();

  public subscribe(sceneId: string, listener: ISceneEventListener): void {
    if (!this._sceneListeners.has(sceneId)) {
      this._sceneListeners.set(sceneId, []);
    }
    this._sceneListeners.get(sceneId)!.push(listener);
  }

  public unsubscribe(sceneId: string, listener: ISceneEventListener): void {
    const listeners = this._sceneListeners.get(sceneId);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  public notifyEntityAdded(sceneId: string, entity: Entity): void {
    const listeners = this._sceneListeners.get(sceneId);
    if (listeners) {
      for (const listener of listeners) {
        listener.onEntityAdded(entity);
      }
    }
  }

  public notifyEntityRemoved(sceneId: string, entity: Entity): void {
    const listeners = this._sceneListeners.get(sceneId);
    if (listeners) {
      for (const listener of listeners) {
        listener.onEntityRemoved(entity);
      }
    }
  }

  public clearSceneListeners(sceneId: string): void {
    this._sceneListeners.delete(sceneId);
  }
}
