import { RoomData } from "./RoomData";
import TileType from "../world/TileType";

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

    return tile === TileType.FLOOR;

    }
    constructor(data: RoomData) {

    this.tiles = data.tiles;

    this.height = this.tiles.length;

    this.width = this.tiles[0].length;

}

}