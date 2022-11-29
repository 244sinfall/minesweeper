// Взаимодействие игры с состоянием
import { Field } from '../../store/field/types';

type GameProviderActionType = 'get' | 'set';

type GameProviderListeners = {
    [K in GameProviderActionType]: (() => void)[];
};

export class GameProvider {
    private _listeners: GameProviderListeners = { set: [], get: [] };
    constructor(private _state: Field) {}
    set state(newState: Field) {
        this._state = newState;
        this._listeners.set.forEach((action) => action());
    }
    get state() {
        this._listeners.get.forEach((action) => action());
        return this._state;
    }
    subscribe(type: GameProviderActionType, action: () => void) {
        this._listeners[type].push(action);
        return () => {
            this._listeners[type] = this._listeners[type].filter((listAction) => listAction !== action);
        };
    }
}
