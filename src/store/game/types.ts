export type FieldSize = {
    width: number;
    height: number;
};

export type GameSettings = {
    size: FieldSize;
    mines: number;
};

type GameStatus = 'playing';

export type GameState = {
    settings: GameSettings;
    status: GameStatus;
};
