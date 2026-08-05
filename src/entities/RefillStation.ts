import Phaser from "phaser";
import Interactable from "./Interactable";
import Player from "./Player";

export default class RefillStation 
    extends Phaser.GameObjects.Rectangle
    implements Interactable {

    private row: number;
    private column: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        column: number,
        row: number
    ) {

        super(
            scene,
            x,
            y,
            32,
            32,
            0x00ffff
        );

        this.row = row;
        this.column = column;

        scene.add.existing(this);

    }

    public interact(player: Player): void {

    player.refillOil();

    console.log("Oil refilled!");

}

    public getRow(): number {
        return this.row;
    }

    public getColumn(): number {
        return this.column;
    }

}