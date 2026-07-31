import Phaser from "phaser";
import Player from "../entities/Player";
import Machine from "../entities/Machine";

import {
    TILE_SIZE,
    ROOM_WIDTH,
    ROOM_HEIGHT
} from "../constants";

export default class GameScene extends Phaser.Scene {

    private player!: Player;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private machine!: Machine;
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
    create() {

        const playerColumn = 7;
        const playerRow = 12;
        const playerX = playerColumn * TILE_SIZE + TILE_SIZE / 2;
        const playerY = playerRow * TILE_SIZE + TILE_SIZE / 2;
        this.player = new Player(
            this,
            playerX,
            playerY
        );
        this.drawGrid();
        this.cursors = this.input.keyboard!.createCursorKeys();
        const machineColumn = 4;
        const machineRow = 4;

        const machineX = machineColumn * TILE_SIZE+ TILE_SIZE / 2;
        const machineY = machineRow * TILE_SIZE+ TILE_SIZE / 2;

        this.machine = new Machine(
                this,
                machineX,
                machineY
        );
    }

    update() {

        this.player.move(this.cursors);

    }
}