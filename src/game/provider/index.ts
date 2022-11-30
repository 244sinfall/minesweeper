// Взаимодействие игры с состоянием
import { Field } from '../../store/field/types';

type GameProviderActionType = 'import' | 'export';

type GameProviderListeners = {
    [K in GameProviderActionType]: ((newState?: Field) => void)[];
};

export class GameProvider {
    private _listeners: GameProviderListeners = { import: [], export: [] };
    constructor(private _state: Field) {}
    updateState(newState: Field) {
        console.log('import state');
        this._state = [...newState];
        this._listeners.import.forEach((action) => action());
    }
    get state() {
        return this._state;
    }
    exportState(newState: Field) {
        console.log('export state');
        this._state = newState;
        this._listeners.export.forEach((action) => action(newState));
    }
    subscribe(type: GameProviderActionType, action: (newState?: Field) => void) {
        this._listeners[type].push(action);
        return () => {
            this._listeners[type] = this._listeners[type].filter((listAction) => listAction !== action);
        };
    }
}
