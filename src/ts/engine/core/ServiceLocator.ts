export class ServiceLocator {
  private static _instance: ServiceLocator;
  private _services: Map<string, any> = new Map();

  private constructor() {}

  public static instance(): ServiceLocator {
    if (!ServiceLocator._instance) {
      ServiceLocator._instance = new ServiceLocator();
    }
    return ServiceLocator._instance;
  }

  public register<T>(serviceName: string, service: T): void {
    this._services.set(serviceName, service);
  }

  public get<T>(serviceName: string): T {
    const service = this._services.get(serviceName);
    if (!service) {
      throw new Error(`Service '${serviceName}' not found in ServiceLocator`);
    }
    return service as T;
  }

  public has(serviceName: string): boolean {
    return this._services.has(serviceName);
  }

  public clear(): void {
    this._services.clear();
  }
}
