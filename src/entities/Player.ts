import Phaser from "phaser";
import { TILE_SIZE } from "../constants";
import Room from "../world/Room";

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export default class Player extends Phaser.GameObjects.Rectangle {

    private facingIndicator!: Phaser.GameObjects.Arc;
    private column: number;
    private row: number;
    private room: Room;
    private moveDelay = 120;
    private lastMove = 0;
    private moving = false;
    private targetX = 0;
    private targetY = 0;
    private moveSpeed = 2;
    private maxOil = 5;
    private oilAmount = this.maxOil;
    private facing: Direction = Direction.DOWN;

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
    
    this.facingIndicator = scene.add.circle(
        this.x,
        this.y,
        3,
        0x000000
    );
    this.updateFacingIndicator();
}

    private updateFacingIndicator(): void {

    const offset = TILE_SIZE / 4;

    switch (this.facing) {

        case Direction.UP:

            this.facingIndicator.setPosition(
                this.x,
                this.y - offset
            );

            break;

        case Direction.DOWN:

            this.facingIndicator.setPosition(
                this.x,
                this.y + offset
            );

            break;

        case Direction.LEFT:

            this.facingIndicator.setPosition(
                this.x - offset,
                this.y
            );

            break;

        case Direction.RIGHT:

            this.facingIndicator.setPosition(
                this.x + offset,
                this.y
            );

            break;
    }
}

    public refillOil(): void {
    this.oilAmount = this.maxOil;
}

    public useOil(): boolean {

        if (this.oilAmount <= 0) {

            //console.log("Oil can empty");

            return false;

        }

        this.oilAmount--;

        console.log(
            "Oil remaining:",
            this.oilAmount
        );

        return true;

    }
    
    public getOilAmount(): number {
        return this.oilAmount;
    }

    public getMaxOilAmount(): number {
        return this.maxOil;
    }

    public isAdjacentTo(
        row: number,
        column: number
    ): boolean {

        const rowDifference =
            Math.abs(this.row - row);

        const columnDifference =
            Math.abs(this.column - column);

        return rowDifference + columnDifference === 1;
    }
    
    public isFacing(
        row: number,
        column: number
    ): boolean {

    switch (this.facing) {

        case Direction.UP:
            return (
                row === this.row - 1 &&
                column === this.column
            );

        case Direction.DOWN:
            return (
                row === this.row + 1 &&
                column === this.column
            );

        case Direction.LEFT:
            return (
                row === this.row &&
                column === this.column - 1
            );

        case Direction.RIGHT:
            return (
                row === this.row &&
                column === this.column + 1
            );

        default:
            return false;
    }
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

            this.facing = Direction.LEFT;
            this.updateFacingIndicator();
            console.log("LEFT");
            newColumn--;

        }

        else if (cursors.right.isDown) {
            this.facing = Direction.RIGHT;
            this.updateFacingIndicator();
            console.log("RIGHT");
            newColumn++;
        }

        else if (cursors.up.isDown) {
            this.facing = Direction.UP;
            this.updateFacingIndicator();
            console.log("UP");
            newRow--;
        }

        else if (cursors.down.isDown) {
            this.facing = Direction.DOWN;
            this.updateFacingIndicator();
            console.log("DOWN");
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

    public requestDirection(direction: Direction): void {
        this.facing = direction;
        this.updateFacingIndicator();
    if (this.moving) {
        return;
    }

    if (Date.now() - this.lastMove < this.moveDelay) {
        return;
    }

    
    let newColumn = this.column;
    let newRow = this.row;

    switch (direction) {

        case Direction.LEFT:
            newColumn--;
            break;

        case Direction.RIGHT:
            newColumn++;
            break;

        case Direction.UP:
            newRow--;
            break;

        case Direction.DOWN:
            newRow++;
            break;
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

            this.updateFacingIndicator();

            this.moving = true;
            this.lastMove = Date.now();
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
            
            this.updateFacingIndicator();
            this.moving = false;
            
        }
        this.updateFacingIndicator();
        
}
}