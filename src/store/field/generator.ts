import { GameSettings } from '../game/types';
import { Cell, Field, MinesAround } from './types';
import { generateRandomNumber } from '../../utils/random-number';

function defaultCell(): Cell {
    return {
        isMine: false,
        uncovered: false,
        marked: false,
        minesAround: 0,
    };
}

function defaultField(settings: GameSettings): Field {
    // height - количество массивов [ [ 1 2 3 ] [4 5 6] ] - height: 2, width: 3
    // width - размер массива
    // const positionsLeft = settings.size.width * settings.size.height;
    const fieldHeight: Cell[][] = new Array(settings.size.height);
    for (let i = 0; i < fieldHeight.length; i++) {
        const fieldWidth: Cell[] = new Array(settings.size.width);
        for (let j = 0; j < fieldWidth.length; j++) {
            fieldWidth[j] = defaultCell();
        }
        fieldHeight[i] = fieldWidth;
    }
    return fieldHeight;
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
            let surroundingMines = 0;
            const shouldCheckRight = cellIndex + 1 < settings.size.width;
            const shouldCheckLeft = cellIndex > 0;
            const shouldCheckUp = rowIndex > 0;
            const shouldCheckDown = rowIndex + 1 < settings.size.height;
            if (shouldCheckUp) {
                if (shouldCheckLeft && field[rowIndex - 1][cellIndex - 1].isMine) surroundingMines++;
                if (field[rowIndex - 1][cellIndex].isMine) surroundingMines++;
                if (shouldCheckRight && field[rowIndex - 1][cellIndex + 1].isMine) surroundingMines++;
            }
            if (shouldCheckLeft && field[rowIndex][cellIndex - 1].isMine) surroundingMines++;
            if (shouldCheckRight && field[rowIndex][cellIndex + 1].isMine) surroundingMines++;
            if (shouldCheckDown) {
                if (shouldCheckLeft && field[rowIndex + 1][cellIndex - 1].isMine) surroundingMines++;
                if (field[rowIndex + 1][cellIndex].isMine) surroundingMines++;
                if (shouldCheckRight && field[rowIndex + 1][cellIndex + 1].isMine) surroundingMines++;
            }
            cell.minesAround = surroundingMines as MinesAround;
        });
    });
    return field;
}
