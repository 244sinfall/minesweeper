// Управляет отрисовкой текущего состояния игры
import { GameProvider } from '../provider';
import { GameSettings } from '../../store/game/types';
import { CellView } from '../cell';
import { Field } from '../../store/field/types';

export class FieldView {
    private _state: CellView[][];
    private readonly _context: CanvasRenderingContext2D;
    public drawField() {
        const cellSize = this._canvas.width / Math.max(this._settings.size.width, this._settings.size.height);
        this._state.forEach((row) => row.forEach((cell) => cell.draw(this._context, cellSize)));
    }
    private _generateCells(field: Field) {
        return field.map((row) => row.map((cell) => new CellView(this, { ...cell })));
    }
    constructor(private _game: GameProvider, private _settings: GameSettings, private _canvas: HTMLCanvasElement) {
        const context = this._canvas.getContext('2d');
        if (!context) throw new Error('Context could not be created.');
        this._context = context;
        this._state = this._generateCells(this._game.state);
        this._game.subscribe('set', () => {
            console.log('update state');
            this._state = this._generateCells(this._game.state);
            this.drawField();
        });
    }
}
