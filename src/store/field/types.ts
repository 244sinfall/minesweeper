export type MinesAround = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Cell = {
    isMine: boolean;
    uncovered: boolean;
    marked: boolean;
    minesAround: MinesAround;
};

export type Field = Cell[][];

export type FieldState = {
    field: Field;
};
