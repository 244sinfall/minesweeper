export type MinesAround = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ICell {
    isMine: boolean;
    uncovered: boolean;
    marked: boolean;
    minesAround: MinesAround;
    x: number; // Положение в массиве второго уровня
    y: number; // Положение в массиве первого уровня!
}

export type Field = ICell[][];

export type FieldState = {
    field: Field;
};
