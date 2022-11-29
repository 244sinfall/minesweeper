import { GameSettings } from '../game/types';
import { ICell, Field, MinesAround } from './types';
import { generateRandomNumber } from '../../utils/random-number';

function defaultCell(rowIndex: number, cellIndex: number): ICell {
    return {
        isMine: false,
        uncovered: false,
        marked: false,
        minesAround: 0,
        x: cellIndex,
        y: rowIndex,
    };
}

function defaultField(settings: GameSettings): Field {
    // height - количество массивов [ [ 1 2 3 ] [4 5 6] ] - height: 2, width: 3
    // width - размер массива
    // const positionsLeft = settings.size.width * settings.size.height;
    const fieldHeight: ICell[][] = new Array(settings.size.height);
    for (let i = 0; i < fieldHeight.length; i++) {
        const fieldWidth: ICell[] = new Array(settings.size.width);
        for (let j = 0; j < fieldWidth.length; j++) {
            fieldWidth[j] = defaultCell(i, j);
        }
        fieldHeight[i] = fieldWidth;
    }
    return fieldHeight;
}

export function getSurroundingCells(field: Field, rowIndex: number, cellIndex: number): ICell[] {
    const height = field.length;
    if (field.length == 0) return [];
    const width = field[0].length;
    const result: ICell[] = [];
    const shouldCheckRight = cellIndex + 1 < width;
    const shouldCheckLeft = cellIndex > 0;
    const shouldCheckUp = rowIndex > 0;
    const shouldCheckDown = rowIndex + 1 < height;
    if (shouldCheckUp) {
        result.push(field[rowIndex - 1][cellIndex]);
        if (shouldCheckLeft) result.push(field[rowIndex - 1][cellIndex - 1]);
        if (shouldCheckRight) result.push(field[rowIndex - 1][cellIndex + 1]);
    }
    if (shouldCheckLeft) result.push(field[rowIndex][cellIndex - 1]);
    if (shouldCheckRight) result.push(field[rowIndex][cellIndex + 1]);
    if (shouldCheckDown) {
        result.push(field[rowIndex + 1][cellIndex]);
        if (shouldCheckLeft) result.push(field[rowIndex + 1][cellIndex - 1]);
        if (shouldCheckRight) result.push(field[rowIndex + 1][cellIndex + 1]);
    }
    return result;
}

export function generateField(settings: GameSettings): Field {
    // height - количество массивов [ [ 1 2 3 ] [4 5 6] ] - height: 2, width: 3
    // width - размер массива
    // Заполнение нулевыми значениями
    const field = defaultField(settings);
    // Заполнение минами
    let mines = Math.min(settings.mines, settings.size.height * settings.size.width - 10);
    while (mines !== 0) {
        const randomHeight = generateRandomNumber(0, settings.size.height - 1);
        const randomWidth = generateRandomNumber(0, settings.size.width - 1);
        if (!field[randomHeight][randomWidth].isMine) {
            field[randomHeight][randomWidth].isMine = true;
            mines--;
        }
    }
    // Заполнение значения мин вокруг
    field.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const surroundingCells = getSurroundingCells(field, rowIndex, cellIndex);
            cell.minesAround = surroundingCells.filter((cell) => cell.isMine).length as MinesAround;
        });
    });
    return field;
}
