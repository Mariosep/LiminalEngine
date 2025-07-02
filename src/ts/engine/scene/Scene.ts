import { Entity } from "../ecs/Entity";
import { EventMediator } from "../core/EventMediator";
import { ServiceLocator } from "../core/ServiceLocator";
import { v4 as uuidv4 } from "uuid";
import { SceneAdapter } from "../renderer/SceneAdapter";

export class Scene {
  private _id: string;
  private _entities: Entity[] = [];
  private _adapter!: SceneAdapter;

  private _eventMediator!: EventMediator;

  public get entities(): Entity[] { return this._entities; }
  public get id(): string { return this._id; }
  public get adapter(): SceneAdapter { return this._adapter; }

  constructor() {
    this._id = uuidv4();
    this._entities = [];
    
    this._eventMediator = ServiceLocator.instance().get<EventMediator>("EventMediator");
    console.log("Scene constructor");
  }

  public init(): void {
    this._adapter = new SceneAdapter(this);
  }

  public update(): void {
    for (const entity of this._entities) {
      entity.update();
    }
  }

  public add(entity: Entity): void {
    this._entities.push(entity);

    this._eventMediator.notifyEntityAdded(this._id, entity);
  }

  public remove(entity: Entity): void {
    const index = this._entities.indexOf(entity);
    if (index !== -1) {
      this._entities.splice(index, 1);

      this._eventMediator.notifyEntityRemoved(this._id, entity);
    }
  }

  public updateTransforms(): void {
    this._adapter.updateTransforms();
  }

  public onWindowResize(): void {
    this._adapter.onWindowResize();
  }
}
