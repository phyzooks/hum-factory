import Phaser from "phaser";

export default class Tile extends Phaser.GameObjects.Rectangle {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        color: number
    ) {

        super(
            scene,
            x,
            y,
            32,
            32,
            color
        );

        scene.add.existing(this);

    }
}