import Phaser from "phaser";
import { TILE_SIZE } from "../constants";
import Room from "../world/Room";

export default class Player extends Phaser.GameObjects.Rectangle {

    private column: number;
    private row: number;
    private room: Room;
    private moveDelay = 120;
    private lastMove = 0;
    private moving = false;
    private targetX = 0;
    private targetY = 0;
    private moveSpeed = 2;
    private oilAmount = 5;
    
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
    public useOil(): boolean {

        if (this.oilAmount <= 0) {

            console.log("Oil can empty");

            return false;

        }

        this.oilAmount--;

        console.log(
            "Oil remaining:",
            this.oilAmount
        );

        return true;

    }
    
    
    public requestMove(
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    ): void {
        if (this.moving) {
        return;
        }
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

            this.targetX =
                this.column * TILE_SIZE +
                TILE_SIZE / 2;

            this.targetY =
                this.row * TILE_SIZE +
                TILE_SIZE / 2;

            this.moving = true;
            }
        }
}
    public updateMovement(): void {

        if (!this.moving) {
            return;
        }

        if (this.x < this.targetX) {
            this.x += this.moveSpeed;
        }

        if (this.x > this.targetX) {
            this.x -= this.moveSpeed;
        }

        if (this.y < this.targetY) {
            this.y += this.moveSpeed;
        }

        if (this.y > this.targetY) {
            this.y -= this.moveSpeed;
        }

        if (
            this.x === this.targetX &&
            this.y === this.targetY
        ) {
            this.moving = false;
        }
}
}