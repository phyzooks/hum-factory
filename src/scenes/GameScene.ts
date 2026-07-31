import Phaser from "phaser";
import Player from "../entities/Player";
import Machine from "../entities/Machine";
import Room from "../world/Room";
import { TestRoom } from "../world/rooms/TestRoom";
import Tile from "../entities/Tile";

import {
    TILE_SIZE,
    ROOM_WIDTH,
    ROOM_HEIGHT
} from "../constants";

export default class GameScene extends Phaser.Scene {

    private player!: Player;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private machine!: Machine;
    private room!: Room;
    constructor() {
        super("GameScene");
    }
    private drawGrid(): void {

    const graphics = this.add.graphics();

    graphics.lineStyle(1, 0x444444);

    for (let x = 0; x <= ROOM_WIDTH; x++) {

        graphics.moveTo(
            x * TILE_SIZE,
            0
        );

        graphics.lineTo(
            x * TILE_SIZE,
            ROOM_HEIGHT * TILE_SIZE
        );
    }

    for (let y = 0; y <= ROOM_HEIGHT; y++) {

        graphics.moveTo(
            0,
            y * TILE_SIZE
        );

        graphics.lineTo(
            ROOM_WIDTH * TILE_SIZE,
            y * TILE_SIZE
        );
    }

    graphics.strokePath();
    }

    private drawRoom(): void {

    for (let row = 0; row < this.room.tiles.length; row++) {

        for (let col = 0; col < this.room.tiles[row].length; col++) {

            const tile = this.room.tiles[row][col];

            if (tile === 1) {

                new Tile(
                this,
                col * TILE_SIZE + TILE_SIZE / 2,
                row * TILE_SIZE + TILE_SIZE / 2,
                0x555555
);

            }

            if (tile === 2) {

                new Machine(
                    this,
                    col * TILE_SIZE + TILE_SIZE / 2,
                    row * TILE_SIZE + TILE_SIZE / 2
                );

            }
        }
    }
}
    create() {
        
        const playerColumn = 3;
        const playerRow = 3;
        const playerX = playerColumn * TILE_SIZE + TILE_SIZE / 2;
        const playerY = playerRow * TILE_SIZE + TILE_SIZE / 2;
        this.player = new Player(
            this,
            playerX,
            playerY
        );
       // this.drawGrid();
        
       this.room = new Room(TestRoom);
        this.drawRoom();

        this.cursors = this.input.keyboard!.createCursorKeys();
        
        
    }

    update() {

        this.player.move(this.cursors);

    }
}