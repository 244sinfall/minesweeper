// Управляет ячейкой
import { FieldView } from '../field-view';
import { ICell } from '../../store/field/types';
import * as MineAmountColors from './text-colors.json';
import flagSVG from '../../assets/flag.svg?url';
import bombSVG from '../../assets/bomb.svg?url';

/**
 * Придумать загрузку картинок!
 */
export class CellView {
    // private _images: CellViewImages;
    constructor(private _field: FieldView, private _data: ICell, private _context: CanvasRenderingContext2D) {}
    private _prepareDraw() {
        this._context.save();
        const color = (this._data.x + this._data.y) % 2 === 0 ? '#FFA500' : '#00FF00';
        this._context.fillStyle = color;
        this._context.strokeStyle = color;
    }
    private _finishDraw() {
        this._context.restore();
    }
    get data() {
        return this._data;
    }
    draw() {
        this._defaultView();
        if (this.data.uncovered) this.uncover();
        else if (this.data.marked) this._addMark();
    }
    private _defaultView() {
        const size = this._field.cellSize;
        this._prepareDraw();
        this._context.clearRect(this._data.x * size, this._data.y * size, size, size);
        this._context.shadowColor = 'black';
        this._context.shadowBlur = 3;
        this._context.shadowOffsetX = -1;
        this._context.shadowOffsetY = -1;
        this._context.fillRect(this._data.x * size, this._data.y * size, size, size);
        this._finishDraw();
    }
    private _removeMark() {
        this._removeImage(0.8 * this._field.cellSize);
    }
    private _removeImage(svgSize: number) {
        const size = this._field.cellSize;
        this._prepareDraw();
        this._context.clearRect(
            this._data.x * size + (size - svgSize) / 2,
            this._data.y * size + (size - svgSize) / 2,
            svgSize,
            svgSize,
        );
        this._context.fillRect(
            this._data.x * size + (size - svgSize) / 2 - 2,
            this._data.y * size + (size - svgSize) / 2 - 2,
            svgSize + 4,
            svgSize + 4,
        );
        this._finishDraw();
    }
    private _placeImageIn(maxSize: number, base64: string, alt: string) {
        this._prepareDraw();
        const size = this._field.cellSize;
        const img = new Image();
        img.alt = alt;
        img.onload = () => {
            let { width, height } = img;
            const aspectRatio = width / height;
            // Если ширина больше чем высота
            if (aspectRatio > 1) {
                width = maxSize;
                height = maxSize / aspectRatio;
            } else {
                height = maxSize;
                width = maxSize * aspectRatio;
            }
            this._context.drawImage(
                img,
                this._data.x * size + (size - width) / 2,
                this._data.y * size + (size - height) / 2,
                width,
                height,
            );
            this._finishDraw();
        };
        img.src = base64;
    }
    private _addMark() {
        this._placeImageIn(0.8 * this._field.cellSize, flagSVG, 'Флаг');
    }
    private _addMine() {
        this._placeImageIn(this._field.cellSize, bombSVG, 'Мина!');
    }
    mark() {
        if (this._data.marked) {
            this._removeMark();
        } else {
            this._addMark();
        }
        this._data = { ...this._data, marked: !this._data.marked };
    }
    uncover() {
        const size = this._field.cellSize;
        this._prepareDraw();
        this._context.lineWidth = 1;
        this._context.strokeStyle = '#000000';
        this._context.fillStyle = '#c0c0c0';
        this._context.fillRect(this._data.x * size, this._data.y * size, size, size);
        this._context.strokeRect(this._data.x * size, this._data.y * size, size - 0.5, size - 0.5);
        if (this._data.minesAround !== 0 && !this._data.isMine) {
            this._context.font = '2rem Arimo';
            this._context.textBaseline = 'middle';
            this._context.textAlign = 'center';
            const key = String(this._data.minesAround) as keyof typeof MineAmountColors;
            this._context.fillStyle = MineAmountColors[key];
            this._context.fillText(
                String(this._data.minesAround),
                this._data.x * size + size / 2,
                this._data.y * size + size / 2,
            );
        } else if (this._data.isMine) {
            this._addMine();
        }
        this._data = { ...this._data, uncovered: true };
        if (this._data.marked) this._data = { ...this._data, marked: false };
    }
}