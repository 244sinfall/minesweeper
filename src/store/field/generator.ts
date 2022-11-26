import { GameSettings } from '../game/types';
import { Cell, Field } from './types';

function defaultCell(): Cell {
    return {
        isMine: false,
        uncovered: false,
        marked: false,
        minesAround: 0,
    };
}

function defaultField(settings: GameSettings): Field {
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
    // const positionsLeft = settings.size.width * settings.size.height;
    const field = defaultField(settings);
    return field;
}
