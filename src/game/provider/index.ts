// Взаимодействие игры с состоянием
import { Field } from '../../store/field/types';

type GameProviderActionType = 'get' | 'update';

type GameProviderListeners = {
    [K in GameProviderActionType]: (() => void)[];
};

export class GameProvider {
    private _listeners: GameProviderListeners = { update: [], get: [] };
    constructor(private _state: Field) {}
    updateState(newState: Field) {
        this._state = newState;
        this._listeners.update.forEach((action) => action());
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
