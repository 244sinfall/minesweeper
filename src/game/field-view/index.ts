// Управляет отрисовкой текущего состояния игры
import { GameProvider } from '../provider';
import { GameSettings } from '../../store/game/types';
import { CellView } from '../cell';
import { Field } from '../../store/field/types';
import { getSurroundingCells } from '../../store/field/generator';

export class FieldView {
    private _state: CellView[][];
    private readonly _context: CanvasRenderingContext2D;
    private _cellSize = 0;
    private _pressTimeout: NodeJS.Timeout | null = null;
    private _selectedCell: CellView | null = null;
    get cellSize() {
        return this._cellSize;
    }
    public drawField() {
        const cellSize = this._frameSize / Math.max(this._settings.size.width, this._settings.size.height);
        if (cellSize !== this._cellSize) this._cellSize = cellSize;
        this._canvas.width = cellSize * this._settings.size.width;
        this._canvas.height = cellSize * this._settings.size.height;
        this._state.forEach((row) => row.forEach((cell) => cell.draw()));
    }
    private _generateCells(field: Field) {
        return field.map((row) => row.map((cell) => new CellView(this, { ...cell }, this._context)));
    }
    private _findCell(x: number, y: number): CellView {
        const cellX = Math.floor(x / this._cellSize);
        const cellY = Math.floor(y / this._cellSize);
        return this._state[cellY][cellX];
    }
    private _stateToField(): Field {
        return this._state.map((row) => row.map((cell) => cell.data));
    }
    set frameSize(frameSize: number) {
        this._frameSize = frameSize;
        this.drawField();
    }
    private _onCellUncover(cell: CellView) {
        const uncoverCell = (y: number, x: number) => {
            this._state[y][x].uncover();
            if (this._state[y][x].data.minesAround === 0 && !this._state[y][x].data.isMine) {
                getSurroundingCells(this._stateToField(), y, x)
                    .filter((cell) => !cell.uncovered)
                    .forEach((cell) => uncoverCell(cell.y, cell.x));
            }
        };
        uncoverCell(cell.data.y, cell.data.x);
    }
    private _onCellMark(cell: CellView) {
        cell.mark();
    }
    constructor(
        private _game: GameProvider,
        private _settings: GameSettings,
        private _canvas: HTMLCanvasElement,
        private _frameSize: number,
    ) {
        const context = this._canvas.getContext('2d');
        if (!context) throw new Error('Context could not be created.');
        this._context = context;
        this._state = this._generateCells(this._game.state);
        this._game.subscribe('import', () => {
            this._state = this._generateCells(this._game.state);
            this.drawField();
        });
        this._canvas.onpointerdown = (e) => {
            e.preventDefault();
            this._selectedCell = this._findCell(e.offsetX, e.offsetY);
            if (e.button === 0) {
                this._pressTimeout = setTimeout(() => {
                    if (!this._selectedCell) return;
                    this._onCellMark(this._selectedCell);
                    this._pressTimeout = null;
                    if ('vibrate' in navigator) navigator.vibrate(100);
                }, 1000);
            } else {
                if (!this._selectedCell) return;
                this._onCellMark(this._selectedCell);
            }
            this._game.exportState(this._stateToField());
        };
        this._canvas.oncontextmenu = (e) => e.preventDefault();
        this._canvas.onpointerup = (e) => {
            if (this._findCell(e.offsetX, e.offsetY) === this._selectedCell && this._pressTimeout) {
                this._onCellUncover(this._selectedCell);
                clearTimeout(this._pressTimeout);
                this._pressTimeout = null;
            }
        };
        this._canvas.onpointermove = () => {
            // console.log(e, 'MOVE');
        };
    }
}
