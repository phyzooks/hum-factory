import { RoomData } from "./RoomData";

export default class Room {

    public tiles: number[][];

    public width: number;

    public height: number;


    constructor(data: RoomData) {

        this.tiles = data.tiles;

        this.width = data.width;

        this.height = data.height;

    }

}