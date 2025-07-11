import { Entity } from "../ecs/Entity";

export interface ISceneEventListener {
  onEntityAdded(entity: Entity): void;
  onEntityRemoved(entity: Entity): void;
}

export interface IEntityEventListener {
  onEntityActiveChanged(entity: Entity, active: boolean): void;
}

export class EventMediator {
  private _sceneListeners: Map<string, ISceneEventListener[]> = new Map();
  private _entityListeners: Map<string, IEntityEventListener[]> = new Map();

  public subscribeToSceneEvents(sceneId: string, listener: ISceneEventListener): void {
    if (!this._sceneListeners.has(sceneId)) {
      this._sceneListeners.set(sceneId, []);
    }
    this._sceneListeners.get(sceneId)!.push(listener);
  }

  public unsubscribeFromSceneEvents(sceneId: string, listener: ISceneEventListener): void {
    const listeners = this._sceneListeners.get(sceneId);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  public subscribeToEntityEvents(entity: Entity, listener: IEntityEventListener): void {
    if (!this._entityListeners.has(entity.id)) {
      this._entityListeners.set(entity.id, []);
    }
    this._entityListeners.get(entity.id)!.push(listener);
  }

  public unsubscribeFromEntityEvents(entity: Entity, listener: IEntityEventListener): void {
    const listeners = this._entityListeners.get(entity.id);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Scene events
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

  // Entity events
  public notifyEntityActiveChanged(entity: Entity, active: boolean): void {
    const listeners = this._entityListeners.get(entity.id);
    if (listeners) {
      for (const listener of listeners) {
        listener.onEntityActiveChanged(entity, active);
      }
    }
  }

  public clearSceneListeners(sceneId: string): void {
    this._sceneListeners.delete(sceneId);
  }
}