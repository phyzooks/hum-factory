import { RoomData } from "./RoomData";

export default class Room {

    public tiles: number[][];

    public width: number;

    public height: number;

    public isWalkable(column: number, row: number): boolean {

    if (row < 0 || row >= this.height) {
        return false;
    }

    if (column < 0 || column >= this.width) {
        return false;
    }

    const tile = this.tiles[row][column];

    return tile === 0;

    }
    constructor(data: RoomData) {

        this.tiles = data.tiles;

        this.width = data.width;

        this.height = data.height;

    }

}