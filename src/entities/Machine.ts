import Phaser from "phaser";

export default class Machine extends Phaser.GameObjects.Rectangle {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {

        super(
            scene,
            x,
            y,
            32,
            32,
            0x888888
        );

        scene.add.existing(this);
    }
}