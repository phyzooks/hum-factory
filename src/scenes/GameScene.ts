import Phaser from "phaser";
import Player from "../entities/Player";
import Machine from "../entities/Machine";
import Room from "../world/Room";
import { TestRoom } from "../world/rooms/TestRoom";
import Tile from "../entities/Tile";
import TileType from "../world/TileType";

import {
    TILE_SIZE,
    } from "../constants";

export default class GameScene extends Phaser.Scene {

    private player!: Player;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private interactKey!: Phaser.Input.Keyboard.Key;
    private oilKey!: Phaser.Input.Keyboard.Key;
    private machine!: Machine;
    private room!: Room;
    
    constructor() {
        super("GameScene");
    }
    private drawGrid(): void {

    const graphics = this.add.graphics();

    graphics.lineStyle(1, 0x444444);

    for (let x = 0; x <= this.room.width; x++) {

        graphics.moveTo(
            x * TILE_SIZE,
            0
        );

        graphics.lineTo(
            x * TILE_SIZE,
            this.room.height * TILE_SIZE
        );
    }

    for (let y = 0; y <= this.room.height; y++) {

        graphics.moveTo(
            0,
            y * TILE_SIZE
        );

        graphics.lineTo(
            this.room.width * TILE_SIZE,
            y * TILE_SIZE
        );
    }

    graphics.strokePath();
    }

    private drawRoom(): void {

    for (let row = 0; row < this.room.tiles.length; row++) {

        for (let col = 0; col < this.room.tiles[row].length; col++) {

            const tile = this.room.tiles[row][col];

            if (tile === TileType.WALL) {

                new Tile(
                this,
                col * TILE_SIZE + TILE_SIZE / 2,
                row * TILE_SIZE + TILE_SIZE / 2,
                0x555555
            );

            }

            if (tile === TileType.MACHINE) {

                this.machine = new Machine(
                this,
                col * TILE_SIZE + TILE_SIZE / 2,
                row * TILE_SIZE + TILE_SIZE / 2,
                col,
                row
            );

            }
        }
    }
}
    preload() {

        this.load.audio(
            "factory_hum",
            "assets/audio/factory_hum.wav"
        );

    }
    create() {
        
        const playerColumn = 2;
        const playerRow = 3;
        const playerX = playerColumn * TILE_SIZE + TILE_SIZE / 2;
        const playerY = playerRow * TILE_SIZE + TILE_SIZE / 2;
        
        this.room = new Room(TestRoom);
        this.drawRoom();
        this.player = new Player(
            this,
            playerColumn,
            playerRow,
            this.room
        );
       this.drawGrid();
        
       

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
            );
        this.interactKey =
            this.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
            );
        this.oilKey =
            this.input.keyboard!.addKey(
                Phaser.Input.Keyboard.KeyCodes.O
            );
        
        
    }

    update(time: number) {

    this.player.requestMove(this.cursors);

    this.player.updateMovement();

    this.machine.update(time);

    if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {

        this.machine.interact();
    }
    if (Phaser.Input.Keyboard.JustDown(this.oilKey)) {if (
    this.player.isAdjacentTo(
        this.machine.getRow(),
        this.machine.getColumn()
    )
) {

    if (this.player.useOil()) {

        this.machine.applyOil();

    }

}
   }
}
}