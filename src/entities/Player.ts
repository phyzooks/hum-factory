import Phaser from "phaser";
import { TILE_SIZE } from "../constants";
import Room from "../world/Room";

export default class Player extends Phaser.GameObjects.Rectangle {

    private speed = 3;
    private column: number;
    private row: number;
    private room: Room;

   constructor(
    scene: Phaser.Scene,
    column: number,
    row: number,
    room: Room
) {

        

    super(
        scene,
        column * TILE_SIZE + TILE_SIZE / 2,
        row * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE - 4,
        TILE_SIZE - 4,
        0xffff00
        );
    this.room = room;
        this.column = column;
            this.row = row;
            scene.add.existing(this);
        }
        private moveDelay = 120;
        private lastMove = 0;
        private moving = false;
    public move(
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
): void {

    if (Date.now() - this.lastMove < this.moveDelay) {
        return;
    }

    let newColumn = this.column;
    let newRow = this.row;

    if (cursors.left.isDown) {
        newColumn--;
    }

    else if (cursors.right.isDown) {
        newColumn++;
    }

    else if (cursors.up.isDown) {
        newRow--;
    }

    else if (cursors.down.isDown) {
        newRow++;
    }

    if (
        newColumn !== this.column ||
        newRow !== this.row
    ) {

        if (this.room.isWalkable(newColumn, newRow)) {

            this.column = newColumn;
            this.row = newRow;

            this.x =
                this.column * TILE_SIZE +
                TILE_SIZE / 2;

            this.y =
                this.row * TILE_SIZE +
                TILE_SIZE / 2;

            this.lastMove = Date.now();
        }
    }
}
}