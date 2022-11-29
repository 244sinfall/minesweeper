// Управляет ячейкой
import { FieldView } from '../field-view';
import { ICell } from '../../store/field/types';

export class CellView {
    constructor(private _field: FieldView, private _data: ICell) {
        console.log(this._field);
    }
    draw(ctx: CanvasRenderingContext2D, size: number) {
        ctx.save();
        console.log((this._data.x + this._data.y) % 2);
        ctx.fillStyle = (this._data.x + this._data.y) % 2 === 0 ? '#FFA500' : '#00FF00';
        ctx.fillRect(this._data.x * size, this._data.y * size, size, size);
        console.log(this._data.x * size, this._data.y * size, size, size);
        ctx.restore();
    }
}
