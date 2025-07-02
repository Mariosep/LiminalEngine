import { IEngineModule } from "./IEngineModule";

export class TimeManager implements IEngineModule {

    private static _deltaTime: number = 0;
    private static _time: number = 0;

    private _lastTime: number = 0;
    private _currentTime: number = 0;

    public static get deltaTime(): number { return TimeManager._deltaTime; }
    public static get time(): number { return TimeManager._time; }

    constructor() {
        console.log("TimeManager constructor");
    }

    public init() {
        TimeManager._deltaTime = 0;
        TimeManager._time = 0;
        this._lastTime = performance.now();
        this._currentTime = performance.now();
    }

    public update(): void {
        this._currentTime = performance.now();
        TimeManager._deltaTime = (this._currentTime - this._lastTime) / 1000;
        TimeManager._time += TimeManager._deltaTime;
        this._lastTime = this._currentTime;
    }
}