export default class Room {

    public tiles: number[][];

    constructor() {

        this.tiles = [
            [1,1,1,1,1,1,1],
            [1,0,0,0,0,0,1],
            [1,0,0,2,0,0,1],
            [1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1]
        ];

    }
}